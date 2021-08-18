import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";

@injectable()
export class AdminUiStore {
  sidebarOpened = true;

  constructor() {
    makeAutoObservable(this);
  }

  toggleSidebar = (): void => {
    this.sidebarOpened = !this.sidebarOpened;
  };
}
