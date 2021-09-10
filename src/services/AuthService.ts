import cancionistica from "../api/cancionistica";
import { UserLoginRequest, UserRegisterRequest, UserRegistrationResponse } from "../stores/data-stores/UserStore";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { AxiosResponse } from "axios";
import { User } from "../models/User";
import { TYPES } from "../container/types";
import { INotificationService, NotificationType } from "./NotificationService";
import { camelToSnakeObj } from "../helpers/camelToSnake";

export interface IAuthService {
  register: (data: UserRegisterRequest) => Promise<AxiosResponse>;
  login: (data: UserLoginRequest) => Promise<AxiosResponse<UserRegistrationResponse>>;
  logout: () => void;
  getLoggedUser(): Promise<AxiosResponse<User>>;
  emailExists(email: string): Promise<boolean>;
  resetPasswordRequest(email: string): Promise<AxiosResponse>;
  resetPassword(data: ResetPasswordData): Promise<AxiosResponse>;
  changePassword(data: ChangePasswordData): Promise<AxiosResponse>;
  passwordMatches(password: string): Promise<boolean>;
  isAdmin(): Promise<boolean>;
}

export interface ResetPasswordData {
  email: string;
  password: string;
  passwordConfirmation: string;
  token: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface CaseFormattedChangePasswordData {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
}

@injectable()
export class AuthService implements IAuthService {

  @inject(TYPES.notificationService) private notificationService!: INotificationService;

  register = async (data: UserRegisterRequest): Promise<AxiosResponse> => {
    const { name, email, password, password_confirmation } = camelToSnakeObj(data);
    await cancionistica.get(`/sanctum/csrf-cookie`);
    return cancionistica.post(`/auth/register`, {
      name, email, password, password_confirmation
    });
  };

  login = async (data: UserLoginRequest): Promise<AxiosResponse<UserRegistrationResponse>> => {
    await cancionistica.get(`/sanctum/csrf-cookie`);
    return cancionistica.post(`/auth/login`, data);
  };

  logout = async (): Promise<void> => {
    return cancionistica.get(`/auth/logout`);
  };

  getLoggedUser = async (): Promise<AxiosResponse<User>> => {
    await cancionistica.get(`/sanctum/csrf-cookie`);
    return cancionistica.get<User>("/auth/logged-user");
  };

  emailExists = async (email: string): Promise<boolean> => {
    try {
      const response = await cancionistica.get(`/auth/email-exists/${email}`);
      return response.status === 200;
    } catch (err) {
      return false;
    }
  };

  resetPasswordRequest = async (email: string): Promise<AxiosResponse> => {
    try {
      const res = await cancionistica.post("/auth/forgot-password", {
        email
      });
      this.notificationService.createNotification(NotificationType.SUCCESS, "Se te envió un email con instrucciones");
      return res;
    } catch (err) {
      this.notificationService.createNotification(NotificationType.ERROR, err.response ? err.response.data : err.message);
    }
  };

  async resetPassword(data: ResetPasswordData): Promise<AxiosResponse> {
    try {
      const res = await cancionistica.post("/auth/reset-password", camelToSnakeObj<ResetPasswordData>(data));
      if (res.status === 200) {
        this.notificationService.createNotification(NotificationType.SUCCESS, "Tu contraseña se actualizó correctamente");
      }
      return res;
    } catch (err) {
      console.log(err.response);

      this.notificationService.createNotification(NotificationType.ERROR, "Ocurrió un error");
    }
  }

  async changePassword(data: ChangePasswordData): Promise<AxiosResponse> {
    return cancionistica.post(
      "/auth/change-password",
      camelToSnakeObj<ChangePasswordData, CaseFormattedChangePasswordData>(data)
    );
  }

  async passwordMatches(password: string): Promise<boolean> {
    try {
      const { data } = await cancionistica.post("/auth/password-matches", { password });
      return data.matches;
    }
    catch (err) {
      return false;
    }
  }

  async isAdmin(): Promise<boolean> {
    try {
      await cancionistica.get<boolean>("/auth/is-admin");
      return true;
    } catch (err) {
      return false;
    }
  }
}
