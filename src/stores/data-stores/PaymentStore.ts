import { inject, injectable } from "inversify";
import { flow, makeAutoObservable } from "mobx";
import { TYPES } from "../../container/types";
import { Course } from "../../models/Course";
import { IPaymentService } from "../../services/PaymentService";

@injectable()
export class PaymentStore {
  @inject(TYPES.paymentService) private paymentService!: IPaymentService;
  private _preferenceId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getMercadopagoPreferenceId = flow(function* (this: PaymentStore, cart: Course[]) {    
    const items = cart.map((course: Course) => {
      return {
        id: course.id,
        price: course.price,
        quantity: 1,
        title: course.title
      };
    });    
    const { data } = yield this.paymentService.getReferenceId({items});
    this._preferenceId = data.data;
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