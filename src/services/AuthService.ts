import cancionistica from "../api/cancionistica";
import {
  UserLoginRequest, UserRegisterRequest, UserRegistrationResponse
} from "../stores/data-stores/UserStore";

export interface IAuthService {
  register: (data: UserRegisterRequest) => Promise<UserRegistrationResponse>;
  login: (data: UserLoginRequest) => Promise<any>;
}
const API_BASE_URL = "https://api-cancionistica.marcosdipaolo.com";

export const AuthService: IAuthService = {

  register: async (data: UserRegisterRequest): Promise<UserRegistrationResponse> => {
    const { name, email, password, password_confirmation } = data;
    await cancionistica.get(`${API_BASE_URL}/sanctum/csrf-cookie`);
    return cancionistica.post(`${API_BASE_URL}/auth/register`, {
      name, email, password, password_confirmation
    });
  },

  login: async (data: UserLoginRequest): Promise<any> => {
    await cancionistica.get(`${API_BASE_URL}/sanctum/csrf-cookie`);
    return cancionistica.post(`${API_BASE_URL}/auth/login`, data);
  }
};
