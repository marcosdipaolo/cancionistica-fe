import { inject, injectable } from "inversify";
import { flow, makeAutoObservable } from "mobx";
import { TYPES } from "../../container/types";
import { Course } from "../../models/Course";
import { IPaymentService } from "../../services/PaymentService";
import { CartStore } from "./CartStore";

@injectable()
export class PaymentStore {
  @inject(TYPES.paymentService) private paymentService!: IPaymentService;
  @inject(TYPES.cartStore) private cartStore!: CartStore;
  private _preferenceId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getMercadopagoPreferenceId = flow(function* (this: PaymentStore) {
    const { data } = yield this.paymentService.getReferenceId(
      {
        items: this.cartStore.cart.map((course: Course) => {
          return {
            id: course.id,
            price: course.price,
            quantity: 1,
            title: course.title
          };
        })
      }
    );
    this.preferenceId = data.data;
    window.localStorage.setItem("mercadopagoPreferenceId", data.data);
  });

  get preferenceId(): string | null {
    const preferenceId = this._preferenceId || window.localStorage.getItem("mercadopagoPreferenceId");
    this._preferenceId = preferenceId;
    return this._preferenceId;
  }

  set preferenceId(preferenceId) {
    this._preferenceId = preferenceId;
  }

  clearPreferenceId() {
    this._preferenceId = null;
    window.localStorage.removeItem("mercadopagoPreferenceId");
  }
}