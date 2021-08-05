import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";

export class AdminUiStore {
  sidebarOpened = true;

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this);
  }

  toggleSidebar = (): void => {
    this.sidebarOpened = !this.sidebarOpened;
  };
}
