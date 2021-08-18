import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import { User } from "../../models/User";

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

export interface UserAttributes {
  id: string;
  name: string;
  email: string;
}

export interface UserRegistrationResponse {
  name: string,
  email: string,
  id: string,
  updated_at: string,
  created_at: string;
}

@injectable()
export class UserStore {
  private loggedUser: User | null = null;
  private readonly cookieName = "loggedUser";

  constructor() {
    makeAutoObservable(this);
  }

  getLoggedUser(): User | null {
    if (!this.loggedUser) {
      const storedUser = window.localStorage.getItem(this.cookieName);
      if (!storedUser) {
        return null;
      }
      const { id, name, email }: UserAttributes = JSON.parse(storedUser);
      return { id, name, email };
    }
    return this.loggedUser;
  }

  login(data: UserRegistrationResponse): void {
    const { id, name, email } = data;
    this.loggedUser = { id, name, email };
    window.localStorage.setItem(this.cookieName, JSON.stringify(data));
  }

  logout() {
    this.loggedUser = null;
    window.localStorage.removeItem(this.cookieName);
  }
}
