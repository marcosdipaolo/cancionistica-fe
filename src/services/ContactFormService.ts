import { injectable } from "inversify";
import cancionistica from "../api/cancionistica";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface IContactFormService {
  sendContactFormEmail: (data: ContactFormData) => any;
}

@injectable()
export class ContactFormService implements IContactFormService {
  sendContactFormEmail(data: ContactFormData): any {
    return cancionistica.post("/api/contact-form", data)
  }
}