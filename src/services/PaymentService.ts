import { AxiosResponse } from "axios";
import { injectable } from "inversify";
import cancionistica from "../api/cancionistica";

export interface IPaymentService {
  pay(): Promise<AxiosResponse>;
}

@injectable()
export class PaymentService implements IPaymentService {
  pay(): Promise<AxiosResponse> {
    return cancionistica.post<void>("/api/payments/mercadopago", {
      productId: "3aaa086a-a37b-434c-8336-8c99077d7a40",
      productName: "module 1",
      productPrice: 17.99,
      productQuantity: 1
    });
  }
}