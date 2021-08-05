import cancionistica from "../api/cancionistica";
import { UserLoginRequest, UserRegisterRequest, UserRegistrationResponse } from "../stores/data-stores/UserStore";
import { injectable } from "inversify";
import "reflect-metadata";

export interface IAuthService {
  register: (data: UserRegisterRequest) => Promise<UserRegistrationResponse>;
  login: (data: UserLoginRequest) => Promise<any>;
}

@injectable()
export class AuthService implements IAuthService {

  register = async (data: UserRegisterRequest): Promise<UserRegistrationResponse> => {
    const { name, email, password, password_confirmation } = data;
    await cancionistica.get(`${process.env.REACT_APP_BACKEND_URL}/sanctum/csrf-cookie`);
    return cancionistica.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
      name, email, password, password_confirmation
    });
  };

  login = async (data: UserLoginRequest): Promise<any> => {
    await cancionistica.get(`${process.env.REACT_APP_BACKEND_URL}/sanctum/csrf-cookie`);
    return cancionistica.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, data);
  };
}
