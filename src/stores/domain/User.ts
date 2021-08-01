import { makeAutoObservable } from "mobx";
import { UserStore } from "../data-stores/UserStore";

export class User {
  id: string
  name: string;
  email: string;
  userStore: UserStore

  constructor(id: string, name: string, email: string, userStore: UserStore) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.userStore = userStore;
    makeAutoObservable(this);
  }
}
