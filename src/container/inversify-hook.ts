import { interfaces } from "inversify";
import { useContext } from "react";
import { InversifyContext } from "./inversify-context";

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
  const container = useContext(InversifyContext);
  if (!container) {
    throw new Error("We had a messy error, we cannot find our service container");
  }
  return container.get<T>(identifier);
};
