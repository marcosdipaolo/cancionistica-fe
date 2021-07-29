import { makeAutoObservable } from "mobx";
import {RootStore} from "./RootStore"

export class UiStore {
    menuOpened = false;

    constructor(rootStore: RootStore){
        makeAutoObservable(this);
    }

    toggleMenu(): void {
        this.menuOpened = !this.menuOpened
    }
}
