import { AxiosResponse } from "axios";
import { injectable } from "inversify";
import cancionistica from "../api/cancionistica";
import { User } from "../models/User";
import { PersonalInfo } from "../stores/data-stores/UserStore";
import { camelToSnakeObj } from "../helpers/camelToSnake";

export interface IUserService {
  setPersonalInfo(userId: string, data: PersonalInfo, isEdit: boolean): Promise<AxiosResponse<User>>;
  getUser(id: string): Promise<AxiosResponse<User>>;
}

@injectable()
export class UserService implements IUserService {
  setPersonalInfo(userId: string, data: PersonalInfo, isEdit: boolean = false): Promise<AxiosResponse<User>> {
    if (isEdit) {
      data._method = "PUT";
    }
    return cancionistica.post<User>(`/api/users/${userId}/personal-info`, camelToSnakeObj(data));
  }
  getUser(id: string): Promise<AxiosResponse<User>> {
    return cancionistica.get<User>(`/api/users/${id}`);
  }
}
