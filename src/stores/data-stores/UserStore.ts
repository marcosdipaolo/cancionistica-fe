import { makeAutoObservable } from "mobx";
import { User } from "../domain/User";
import { RootStore } from "../RootStore";

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

export interface UserRegistrationResponse {
  name: string,
  email: string,
  id: string,
  updated_at: string,
  created_at: string;
}

export class UserStore {
  loggedUser: User | null = null;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  login(data: UserRegistrationResponse): void {
    const { id, name, email } = data;
    this.loggedUser = new User(id, name, email, this);
  }

  logout() {
    this.loggedUser = null;
  }
}
