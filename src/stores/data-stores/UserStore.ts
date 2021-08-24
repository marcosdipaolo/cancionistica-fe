import { inject, injectable } from "inversify";
import { flow, makeAutoObservable } from "mobx";
import { TYPES } from "../../container/types";
import history from "../../history";
import { authMessages } from "../../messages/messages";
import { User } from "../../models/User";
import { IAuthService } from "../../services/AuthService";
import { INotificationService, NotificationType } from "../../services/NotificationService";

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

@injectable()
export class UserStore {
  private loggedUser: User | null = null;
  private readonly cookieName = "loggedUser";
  loggingIn = false;
  registering = false;

  @inject(TYPES.notificationService) private notificationService!: INotificationService;
  @inject(TYPES.authService) private authService!: IAuthService;

  constructor(
  ) {
    makeAutoObservable(this);
  }

  getLoggedUser(): User | null {
    if (!this.loggedUser) {
      const storedUser = window.localStorage.getItem(this.cookieName);
      if (!storedUser) {
        return null;
      }
      const { id, name, email }: UserAttributes = JSON.parse(storedUser);
      return { id, name, email };
    }
    return this.loggedUser;
  }

  login = flow(function* (this: UserStore, _data: UserLoginRequest) {
    try {
      this.loggingIn = true;
      const { data }: { data: UserRegistrationResponse; } = yield this.authService.login({ email: _data.email, password: _data.password });
      const { id, name, email } = data;
      this.loggedUser = { id, name, email };
      yield history.push("/");
      this.notificationService.createNotification(NotificationType.SUCCESS, authMessages.loggedInSuccess);
      window.localStorage.setItem(this.cookieName, JSON.stringify(data));
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
      window.localStorage.removeItem(this.cookieName);
    } catch (err) {
      this.notificationService.createNotification(NotificationType.ERROR, authMessages.loggedOutError);
    }
  }
}
