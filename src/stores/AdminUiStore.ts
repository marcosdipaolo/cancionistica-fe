import { makeAutoObservable } from "mobx";

export class AdminUiStore {
  sidebarOpened = true;

  constructor() {
    makeAutoObservable(this);
  }

  toggleSidebar = (): void => {
    this.sidebarOpened = !this.sidebarOpened;
  };
}
