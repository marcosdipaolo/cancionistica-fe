import { DataStore } from "./data-stores/DataStore";
import { UiStore } from "./UiStore";
import { makeAutoObservable } from "mobx";

export class RootStore {
  dataStore: DataStore;
  uiStore: UiStore;
  constructor() {
    this.dataStore = new DataStore(this);
    this.uiStore = new UiStore(this);
    makeAutoObservable(this);
  }
}
