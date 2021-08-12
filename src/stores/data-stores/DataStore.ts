import { RootStore } from "../RootStore";
import { BlogStore } from "./BlogStore";
import { UserStore } from "./UserStore";

export class DataStore {
  userStore: UserStore;
  blogStore: BlogStore;
  constructor(public rootStore: RootStore) {
    this.userStore = new UserStore(rootStore);
    this.blogStore = new BlogStore(rootStore);
  }
}
