import { inject, injectable } from "inversify";
import { TYPES } from "../../container/types";
import { BlogStore } from "./BlogStore";
import { UserStore } from "./UserStore";

@injectable()
export class DataStore {
  constructor(
    @inject(TYPES.userStore) public userStore: UserStore,
    @inject(TYPES.blogStore) public blogStore: BlogStore
  ) {
  }
}
