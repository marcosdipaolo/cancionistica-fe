import { Container } from "inversify";
import { IAuthService, AuthService } from "../services/AuthService";
import { TYPES } from "./types";

const container = new Container();

container.bind<IAuthService>(TYPES.authService).to(AuthService);

export { container };
