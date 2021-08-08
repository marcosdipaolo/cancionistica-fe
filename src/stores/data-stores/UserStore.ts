import { autorun, makeAutoObservable } from "mobx";
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

export class UserStore {
  private loggedUser: User | null = null;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    autorun(() => console.log(this.loggedUser));
  }

  getLoggedUser(): User | null {
    if ( !this.loggedUser ) {
      const storedUser = window.localStorage.getItem("loggedUser");
      if ( !storedUser ) {
        return null;
      }
      const { id, name, email }: UserAttributes = JSON.parse(storedUser);
      return new User(id, name, email);
    }
    return this.loggedUser;
  }

  login(data: UserRegistrationResponse): void {
    const { id, name, email } = data;
    this.loggedUser = new User(id, name, email);
    window.localStorage.setItem("loggedUser", JSON.stringify(data));
  }

  logout() {
    this.loggedUser = null;
    window.localStorage.removeItem("loggedUser");
  }
}
