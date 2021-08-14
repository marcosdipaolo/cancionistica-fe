import { DataStore } from "./data-stores/DataStore";
import { UiStore } from "./UiStore";
import { makeAutoObservable } from "mobx";
import { AdminUiStore } from "./AdminUiStore";

export class RootStore {
  dataStore: DataStore;
  uiStore: UiStore;
  adminUiStore: AdminUiStore;
  constructor() {
    this.dataStore = new DataStore();
    this.uiStore = new UiStore();
    this.adminUiStore = new AdminUiStore();
    makeAutoObservable(this);
  }
}
