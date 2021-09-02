import { AxiosResponse } from "axios";
import { inject, injectable } from "inversify";
import cancionistica from "../api/cancionistica";
import { TYPES } from "../container/types";
import { INotificationService, NotificationType } from "./NotificationService";

export interface GetPreferenceIdRequest {
  items: {
    id: string;
    title: string;
    price: number;
    quantity: number;
  }[];
}

export interface IPaymentService {
  getReferenceId(data: GetPreferenceIdRequest): Promise<AxiosResponse>;
  postMPResponse(data: { [ key: string ]: string; }): Promise<void>;
}

@injectable()
export class PaymentService implements IPaymentService {
  @inject(TYPES.notificationService) private notificationService!: INotificationService;

  async getReferenceId(data: GetPreferenceIdRequest): Promise<AxiosResponse> {
    try {            
      await cancionistica.get(`/sanctum/csrf-cookie`);
      return cancionistica.post<void>("/api/payments/mercadopago", data);
    } catch (err) {
      this.notificationService.createNotification(NotificationType.ERROR, err.message);
      return Promise.reject({ data: null });
    }
  }

  postMPResponse(data: { [ key: string ]: string; }): Promise<void> {
    return cancionistica.post("/api/mercadopago/callback", data);
  }
}