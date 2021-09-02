import { inject, injectable } from "inversify";
import { flow, makeAutoObservable } from "mobx";
import { TYPES } from "../../container/types";
import { snakeToCamelObj } from "../../helpers/snakeToCamel";
import history from "../../history";
import { authMessages } from "../../messages/messages";
import { User } from "../../models/User";
import { IAuthService } from "../../services/AuthService";
import { INotificationService, NotificationType } from "../../services/NotificationService";
import { IUserService } from "../../services/UserService";

export interface UserRegisterRequest {
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
}

export interface UserLoginRequest {
  email: string,
  password: string,
}

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
}

export interface UserRegistrationResponse {
  name: string,
  email: string,
  id: string,
  updated_at: string,
  created_at: string;
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
  private readonly loggedUserLocalStorageKey = "loggedUser";
  private readonly unauthorizedRouteLocalStorageKey = "unauthorizedRoute";
  loggingIn = false;
  registering = false;

  @inject(TYPES.notificationService) private notificationService!: INotificationService;
  @inject(TYPES.authService) private authService!: IAuthService;
  @inject(TYPES.userService) private userService!: IUserService;

  constructor(
  ) {
    makeAutoObservable(this);
  }

  getLoggedUser(): User | null {
    if (!this.loggedUser) {
      const storedUser = window.localStorage.getItem(this.loggedUserLocalStorageKey);
      if (!storedUser) {
        return null;
      }
      const { id, name, email }: UserAttributes = JSON.parse(storedUser);
      return { id, name, email } as User;
    }
    return this.loggedUser;
  }

  login = flow(function* (this: UserStore, _data: UserLoginRequest) {
    try {
      this.loggingIn = true;
      const { data }: { data: UserRegistrationResponse; } = yield this.authService.login({ email: _data.email, password: _data.password });
      const { id, name, email } = data;
      this.loggedUser = { id, name, email };
      const unauthorizedRoute = window.localStorage.getItem(this.unauthorizedRouteLocalStorageKey);
      if (unauthorizedRoute) {
        window.localStorage.removeItem(this.unauthorizedRouteLocalStorageKey);
        yield history.push(unauthorizedRoute);
      } else {
        yield history.push("/");
      }
      this.notificationService.createNotification(NotificationType.SUCCESS, authMessages.loggedInSuccess);
      window.localStorage.setItem(this.loggedUserLocalStorageKey, JSON.stringify(data));
      this.loggingIn = false;
    } catch (err) {
      this.loggingIn = false;
      this.notificationService.createNotification(NotificationType.ERROR, authMessages.loggingInError);
    }
  });

  register = flow(function* (this: UserStore, _data: UserRegisterRequest) {
    try {
      this.registering = true;
      const { data } = yield this.authService.register(_data);
      const { id, name, email } = data;
      this.loggedUser = { id, name, email };
      yield history.push("/");
      this.notificationService.createNotification(NotificationType.SUCCESS, authMessages.loggedInSuccess);
    } catch (err) {
      this.registering = false;
      this.notificationService.createNotification(NotificationType.ERROR, authMessages.loggingInError);
    }
  });

  logout() {
    try {
      this.notificationService.createNotification(NotificationType.SUCCESS, authMessages.loggedOutSuccess);
      this.authService.logout();
      this.loggedUser = null;
      window.localStorage.removeItem(this.loggedUserLocalStorageKey);
    } catch (err) {
      this.notificationService.createNotification(NotificationType.ERROR, authMessages.loggedOutError);
    }
  }

  loggedOrRedirect = flow(function* (this: UserStore) {
    try {
      const { data }: { data: User; } = yield this.authService.getLoggedUser();
      const { name, email, id } = data;
      this.loggedUser = { name, email, id };
      return true;
    } catch (err) {
      this.notificationService.createNotification(NotificationType.ERROR, authMessages.notLoggedIn);
      this.clearLoggedUser();
      window.localStorage.setItem("unauthorizedRoute", history.location.pathname);
      history.push("/login");
      return false;
    }
  });

  isUserLoggedIn = flow(function* (this: UserStore) {
    try {
      const { data } = yield this.authService.getLoggedUser();
      const { name, email, id, personal_info }: {
        name: string, id: string, email: string, personal_info: {
          first_name: string,
          last_name: string,
          phonenumber: string,
          address_line_one: string,
          address_line_two: string,
          postcode: string,
          city: string,
          country: string,
        };
      } = data;
      this.loggedUser = { name, email, id };
      this.personalInfo = snakeToCamelObj(personal_info) as PersonalInfo;
      window.localStorage.setItem(this.loggedUserLocalStorageKey, JSON.stringify(data));
      return true;
    } catch (err) {
      this.clearLoggedUser();
      return false;
    }
  });

  private clearLoggedUser() {
    this.loggedUser = null;
    window.localStorage.removeItem(this.loggedUserLocalStorageKey);
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
}
