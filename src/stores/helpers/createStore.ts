import { container } from "../../container/inversify.config";
import { TYPES } from "../../container/types";
import { RootStore } from "../RootStore";

export const createStore = () => container.get<RootStore>(TYPES.rootStore);
