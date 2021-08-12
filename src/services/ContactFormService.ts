import { AxiosResponse } from "axios";
import { injectable } from "inversify";
import cancionistica from "../api/cancionistica";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface IContactFormService {
  sendContactFormEmail: (data: ContactFormData) => Promise<AxiosResponse>;
}

@injectable()
export class ContactFormService implements IContactFormService {
  sendContactFormEmail(data: ContactFormData) {
    return cancionistica.post<{msg: string}>("/api/contact-form", data)
  }
}