import { AxiosResponse } from "axios";
import { inject, injectable } from "inversify";
import cancionistica from "../api/cancionistica";
import { TYPES } from "../container/types";
import { Course } from "../models/Course";
import { INotificationService, NotificationType } from "./NotificationService";

export interface IPaymentService {
  getReferenceId(data: Course): Promise<AxiosResponse>;
  postMPResponse(data: {[key: string]: string}): Promise<void>;
}

@injectable()
export class PaymentService implements IPaymentService {
  @inject(TYPES.notificationService) private notificationService!: INotificationService;

  getReferenceId(data: Course): Promise<AxiosResponse> {
    try {
      return cancionistica.post<void>("/api/payments/mercadopago", {
        productId: data.id,
        productName: data.title,
        productPrice: data.price,
        productQuantity: 1
      });
    } catch (err) {
      this.notificationService.createNotification(NotificationType.ERROR, err.message);
      return Promise.reject({ data: null });
    }
  }

  postMPResponse(data: {[key: string]: string}): Promise<void> {
    return cancionistica.post("/api/mercadopago/callback", data);
  }
}