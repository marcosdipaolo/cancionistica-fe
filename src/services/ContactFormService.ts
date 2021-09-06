import history from "../history";
import { inject, injectable } from "inversify";
import cancionistica from "../api/cancionistica";
import { TYPES } from "../container/types";
import { INotificationService, NotificationType } from "./NotificationService";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface IContactFormService {
  sendContactFormEmail: (data: ContactFormData) => Promise<void>;
}

@injectable()
export class ContactFormService implements IContactFormService {

  @inject(TYPES.notificationService) private notificationService: INotificationService;

  async sendContactFormEmail(data: ContactFormData) {
    try {
      await cancionistica.post<{ msg: string; }>("/api/contact-form", data);
      this.notificationService.createNotification(NotificationType.SUCCESS, "Mensaje enviado");
      history.push("/");
    } catch (err) {
      this.notificationService.createNotification(NotificationType.ERROR, "Hubo un problema enviando el mansaje: " + err.message);
    }
  }
}