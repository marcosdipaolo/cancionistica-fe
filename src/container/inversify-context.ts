import { container } from "./inversify.config";
import { createContext } from "react";
import { Container } from "inversify";

export const InversifyContext = createContext<Container>(container);
export const InversifyProvider = InversifyContext.Provider;
