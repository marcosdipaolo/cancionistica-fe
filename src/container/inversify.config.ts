import { Container } from "inversify";
import { IAuthService, AuthService } from "../services/AuthService";
import { ContactFormService, IContactFormService } from "../services/ContactFormService";
import { TYPES } from "./types";

const container = new Container();

container.bind<IAuthService>(TYPES.authService).to(AuthService);
container.bind<IContactFormService>(TYPES.contactFormService).to(ContactFormService);

export { container };
