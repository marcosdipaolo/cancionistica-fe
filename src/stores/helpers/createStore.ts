import { container } from "../../container/inversify.config";
import { RootStore } from "../RootStore";

export const createStore = () => container.get<RootStore>(RootStore);
