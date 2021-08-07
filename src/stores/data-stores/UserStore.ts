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
    if (!this.loggedUser) {
      const storedUser = window.localStorage.getItem("loggedUser");
      if (!storedUser) {
        return null;
      }
      const { id, name, email }: { id: string, name: string, email: string; } = JSON.parse(storedUser);
      return { id, name, email };
    }
    return this.loggedUser;
  }

  login(data: UserRegistrationResponse): void {
    const { id, name, email } = data;
    this.loggedUser = new User(id, name, email);
    // document.cookie
  }

  logout() {
    this.loggedUser = null;
    window.localStorage.removeItem("loggedUser");
  }
}
