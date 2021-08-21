import { inject, injectable } from "inversify";
import { TYPES } from "../../container/types";
import { BlogStore } from "./BlogStore";
import { UserStore } from "./UserStore";

@injectable()
export class DataStore {
  @inject(TYPES.userStore) userStore!: UserStore;
  @inject(TYPES.blogStore) blogStore!: BlogStore;
  constructor() {
  }
}
