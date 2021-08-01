import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";

export class UiStore {
  menuOpened = false;

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this);
  }

  toggleMenu = (): void => {
    this.menuOpened = !this.menuOpened;
    this.toggleMenuBodyClass();
  };

  private toggleMenuBodyClass(): void {
    if (this.menuOpened) {
      document.body.classList.add("menu-show");
    } else {
      document.body.classList.remove("menu-show");
    }
  }
}
