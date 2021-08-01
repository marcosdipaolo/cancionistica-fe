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
    await cancionistica.get("http://localhost:8000/sanctum/csrf-cookie");
    return cancionistica.post("http://localhost:8000/auth/register", {
      name, email, password, password_confirmation
    });
  },

  login: async (data: UserLoginRequest): Promise<any> => {
    await cancionistica.get("http://localhost:8000/sanctum/csrf-cookie");
    return cancionistica.post("http://localhost:8000/auth/login", data);
  }
};
