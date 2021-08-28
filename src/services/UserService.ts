import { AxiosResponse } from "axios";
import { injectable } from "inversify";
import cancionistica from "../api/cancionistica";
import { User } from "../models/User";

export interface PersonalInfoRequest {}

export interface IUserService {
  setPersonalInfo(data: PersonalInfoRequest): Promise<AxiosResponse<User>>;
  getUser(id: string): Promise<AxiosResponse<User>>;
}

@injectable()
export class UserService  implements IUserService {
  setPersonalInfo(data: PersonalInfoRequest): Promise<AxiosResponse<User>> {
    return cancionistica.post<User>("/api/users/personal-info", data);
  }
  getUser(id: string): Promise<AxiosResponse<User>> {
    return cancionistica.get<User>(`/api/users/${id}`);
  }
}
