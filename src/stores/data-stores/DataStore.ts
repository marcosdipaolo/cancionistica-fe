import { BlogStore } from "./BlogStore";
import { UserStore } from "./UserStore";

export class DataStore {
  userStore: UserStore;
  blogStore: BlogStore;
  constructor() {
    this.userStore = new UserStore();
    this.blogStore = new BlogStore();
  }
}
