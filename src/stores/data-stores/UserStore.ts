import { inject, injectable } from "inversify";
import { flow, makeAutoObservable } from "mobx";
import { TYPES } from "../../container/types";
import { snakeToCamelObj } from "../../helpers/snakeToCamel";
import history from "../../history";
import { authMessages } from "../../messages/messages";
import { User } from "../../models/User";
import { IAuthService } from "../../services/AuthService";
import { ILocalStorageService, StoredItem } from "../../services/LocalStorageService";
import { INotificationService, NotificationType } from "../../services/NotificationService";
import { IUserService } from "../../services/UserService";

export interface UserRegisterRequest {
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
}

export interface UserLoginRequest {
  email: string,
  password: string,
}

export interface UserRegistrationResponse {
  name: string,
  email: string,
  id: string,
  updated_at: string,
  created_at: string;
  email_verified_at: string;
  personal_info: {
    address_line_one: string | null
    address_line_two: string | null
    city: string | null
    country: string | null
    created_at: string
    first_name: string
    id: string
    last_name: string
    phonenumber: string
    postcode: string | null
    updated_at: string
    user_id: string
  } | null;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  phonenumber: string;
  addressLineOne?: string,
  addressLineTwo?: string,
  postcode?: string;
  city?: string;
  country?: string;
  _method?: string;
}

@injectable()
export class UserStore {

  private loggedUser: User | null = null;

  personalInfo: PersonalInfo | undefined = undefined;

  loggingIn = false;
  registering = false;
  isAdmin = false;

  @inject(TYPES.notificationService) private notificationService!: INotificationService;
  @inject(TYPES.authService) private authService!: IAuthService;
  @inject(TYPES.localStorageService) private localStorageService!: ILocalStorageService;
  @inject(TYPES.userService) private userService!: IUserService;

  constructor() {
    makeAutoObservable(this);
  }  

  getLoggedUser(): User | null {
    if (!this.loggedUser) {
      const storedUser = this.localStorageService.getStoredItem(StoredItem.loggedUser);
      if (!storedUser) {
        return null;
      }
      const { id, name, email, emailVerifiedAt }: User = JSON.parse(storedUser);
      return { id, name, email, emailVerifiedAt } as User;
    }
    return this.loggedUser;
  }

  login = flow(function* (this: UserStore, _data: UserLoginRequest) {
    try {
      this.loggingIn = true;
      const { data }: { data: UserRegistrationResponse; } = yield this.authService.login({ email: _data.email, password: _data.password });
      const { id, name, email, personalInfo, emailVerifiedAt } = snakeToCamelObj(data);
      this.loggedUser = { id, name, email, emailVerifiedAt };
      this.personalInfo = personalInfo;
      
      const unauthorizedRoute = window.localStorage.getItem(StoredItem.unauthorizedRoute);
      if (unauthorizedRoute) {
        this.localStorageService.clearStoredItem(StoredItem.unauthorizedRoute);
        yield history.push(unauthorizedRoute);
      } else {
        yield history.push("/");
      }
      this.notificationService.createNotification(NotificationType.SUCCESS, authMessages.loggedInSuccess);
      this.localStorageService.setStoredItem(StoredItem.loggedUser, JSON.stringify({ id, name, email, personalInfo, emailVerifiedAt }));
      this.loggingIn = false;
    } catch (err) {
      this.loggingIn = false;
      if (err.response && err.response.status === 403) {
        this.notificationService.createNotification(NotificationType.ERROR, authMessages.unauthorized);
      } else {
        this.notificationService.createNotification(NotificationType.ERROR, authMessages.loggingInError);
      }

    }
  });

  register = flow(function* (this: UserStore, _data: UserRegisterRequest) {
    try {
      this.registering = true;
      const registerResponse = yield this.authService.register(_data);
      const loginResponse = yield this.authService.login({
        email: registerResponse.data.email,
        password: _data.password
      });
      this.loggedUser = snakeToCamelObj(loginResponse);
      this.localStorageService.setStoredItem(StoredItem.loggedUser, JSON.stringify(snakeToCamelObj(loginResponse)));
      this.registering = false;
      yield history.push("/");
      this.notificationService.createNotification(NotificationType.SUCCESS, authMessages.loggedInSuccess);
    } catch (err) {
      this.registering = false;
      this.notificationService.createNotification(NotificationType.ERROR, authMessages.loggingInError);
    }
  });

  logout(withNotification: boolean = true) {
    try {
      if (withNotification) {
        this.notificationService.createNotification(NotificationType.SUCCESS, authMessages.loggedOutSuccess);
      }
      this.authService.logout();
      this.loggedUser = null;
      this.localStorageService.clearStoredItem(StoredItem.loggedUser);
    } catch (err) {
      this.notificationService.createNotification(NotificationType.ERROR, authMessages.loggedOutError);
    }
  }

  loggedOrRedirect = flow(function* (this: UserStore) {
    try {
      const { data }: { data: User; } = yield this.authService.getLoggedUser();
      this.loggedUser = snakeToCamelObj(data);
      return true;
    } catch (err) {
      this.notificationService.createNotification(NotificationType.ERROR, authMessages.notLoggedIn);
      this.clearLoggedUser();
      this.localStorageService.setStoredItem(StoredItem.unauthorizedRoute, history.location.pathname);
      history.push("/login");
      return false;
    }
  });

  isUserLoggedIn = flow(function* (this: UserStore) {
    try {
      const { data } = yield this.authService.getLoggedUser();
      this.loggedUser = snakeToCamelObj(data);
      this.personalInfo = !data.personal_info ? undefined : snakeToCamelObj(data.personal_info) as PersonalInfo;
      this.localStorageService.setStoredItem(StoredItem.loggedUser, JSON.stringify(this.loggedUser));
      return true;
    } catch (err) {
      this.clearLoggedUser();
      return false;
    }
  });

  private clearLoggedUser() {
    this.loggedUser = null;
    this.localStorageService.clearStoredItem(StoredItem.loggedUser);
  }

  setPersonalInfo = flow(function* (this: UserStore, _data: PersonalInfo) {
    if (!this.getLoggedUser()) {
      this.notificationService.createNotification(NotificationType.ERROR, authMessages.notLoggedIn);
      history.push("/login");
      return;
    }
    try {
      const { data } = yield this.userService.setPersonalInfo(this.getLoggedUser()!.id, _data, !!this.personalInfo);
      this.personalInfo = data.personal_info;
      this.notificationService.createNotification(NotificationType.SUCCESS, "Información actualizada");
    } catch (err) {
      this.notificationService.createNotification(NotificationType.ERROR, "Hubo un error actualizando la información");
      console.log(err);
    }
  });

  checkIfAdmin = flow(function*(this: UserStore){
    try {
      const isAdmin: boolean = yield this.authService.isAdmin();
      this.isAdmin = isAdmin;
    } catch(err) {
      this.isAdmin = false;
    }
  });
}
