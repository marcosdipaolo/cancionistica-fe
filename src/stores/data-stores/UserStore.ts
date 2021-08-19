import { flow, makeAutoObservable } from "mobx";
import history from "../../history";
import { authMessages } from "../../messages/messages";
import { User } from "../../models/User";
import { AuthService, IAuthService } from "../../services/AuthService";
import { INotificationService, NotificationService, NotificationType } from "../../services/NotificationService";

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

export class UserStore {
  private loggedUser: User | null = null;
  private readonly cookieName = "loggedUser";
  loggingIn = false;
  registering = false;

  constructor(
    private notificationService: INotificationService = new NotificationService(),
    private authService: IAuthService = new AuthService()
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
      this.loggingIn = false;
      yield history.push("/");
      this.notificationService.createNotification(NotificationType.SUCCESS, authMessages.loggedInSuccess);
      window.localStorage.setItem(this.cookieName, JSON.stringify(data));
    } catch (err) {
      this.notificationService.createNotification(NotificationType.ERROR, authMessages.loggingInError);
    }
  });

  register = flow(function* (this: UserStore, _data: UserRegisterRequest) { 
    try {
      this.registering = true;
      const { data } = yield this.authService.register(_data);
      const { id, name, email } = data;
      this.loggedUser = { id, name, email };
      this.registering = false;
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
      this.notificationService.createNotification(NotificationType.ERROR, authMessages.loggedOutError );
    }
  }
}
