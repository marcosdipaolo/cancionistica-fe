import { inject, injectable } from "inversify";
import { flow, makeAutoObservable } from "mobx";
import { TYPES } from "../../container/types";
import { Course } from "../../models/Course";
import { IPaymentService } from "../../services/PaymentService";

@injectable()
export class PaymentStore {
  @inject(TYPES.paymentService) private paymentService!: IPaymentService;
  private preferenceId: string | null = null;

  constructor(){
    makeAutoObservable(this);
  }

  getMercadopagoReferenceId = flow(function* (this: PaymentStore, _data: Course) {
    const { data } = yield this.paymentService.getReferenceId(_data);
    console.log("from store: ", data.data);    
    this.preferenceId = data.data;
    window.localStorage.setItem("mercadopagoPreferenceId", data.data);
  });

  getPreferenceId(){
    return this.preferenceId || window.localStorage.getItem("mercadopagoPreferenceId")
  }

  clearPreferenceId(){
    this.preferenceId = null;
    window.localStorage.removeItem("mercadopagoPreferenceId");
  }
}