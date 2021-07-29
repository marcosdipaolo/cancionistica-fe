import {useContext}from "react";
import {StoreContext} from "./storeContext";

export const useStore = useContext(StoreContext);
