import { RootStore } from "../RootStore";
import { UserStore } from "./UserStore";

export class DataStore {
  userStore: UserStore;
  constructor(public rootStore: RootStore) {
    this.userStore = new UserStore(rootStore);
  }
}
