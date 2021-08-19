import cancionistica from "../api/cancionistica";
import { UserLoginRequest, UserRegisterRequest, UserRegistrationResponse } from "../stores/data-stores/UserStore";
import { injectable } from "inversify";
import "reflect-metadata";
import { AxiosResponse } from "axios";

export interface IAuthService {
  register: (data: UserRegisterRequest) => Promise<AxiosResponse>;
  login: (data: UserLoginRequest) => Promise<AxiosResponse<UserRegistrationResponse>>;
  logout: () => void;
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
    return await cancionistica.get(`/auth/logout`);
  }
}
