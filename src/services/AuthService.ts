import cancionistica from "../api/cancionistica";
import { UserLoginRequest, UserRegisterRequest, UserRegistrationResponse } from "../stores/data-stores/UserStore";
import { injectable } from "inversify";
import "reflect-metadata";
import { AxiosResponse } from "axios";
import { User } from "../models/User";

export interface IAuthService {
  register: (data: UserRegisterRequest) => Promise<AxiosResponse>;
  login: (data: UserLoginRequest) => Promise<AxiosResponse<UserRegistrationResponse>>;
  logout: () => void;
  getLoggedUser(): Promise<AxiosResponse<User>>;
  emailExists(email: string): Promise<boolean>;
}

@injectable()
export class AuthService implements IAuthService {

  register = async (data: UserRegisterRequest): Promise<AxiosResponse> => {
    const { name, email, password, password_confirmation } = data;
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
}
