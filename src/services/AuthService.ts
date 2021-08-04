import cancionistica from "../api/cancionistica";
import {
  UserLoginRequest, UserRegisterRequest, UserRegistrationResponse
} from "../stores/data-stores/UserStore";

export interface IAuthService {
  register: (data: UserRegisterRequest) => Promise<UserRegistrationResponse>;
  login: (data: UserLoginRequest) => Promise<any>;
}

export const AuthService: IAuthService = {

  register: async (data: UserRegisterRequest): Promise<UserRegistrationResponse> => {
    const { name, email, password, password_confirmation } = data;
    await cancionistica.get(`${process.env.REACT_APP_BACKEND_URL}/sanctum/csrf-cookie`);
    return cancionistica.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
      name, email, password, password_confirmation
    });
  },

  login: async (data: UserLoginRequest): Promise<any> => {
    await cancionistica.get(`${process.env.REACT_APP_BACKEND_URL}/sanctum/csrf-cookie`);
    return cancionistica.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, data);
  }
};
