import { inject, injectable } from "inversify";
import { TYPES } from "../../container/types";
import { BlogStore } from "./BlogStore";
import { PaymentStore } from "./PaymentStore";
import { UserStore } from "./UserStore";

@injectable()
export class DataStore {
  @inject(TYPES.userStore) userStore!: UserStore;
  @inject(TYPES.blogStore) blogStore!: BlogStore;
  @inject(TYPES.paymentStore) paymentStore!: PaymentStore;
}
