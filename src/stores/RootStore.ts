import { DataStore } from "./data-stores/DataStore";
import { UiStore } from "./UiStore";
import { makeAutoObservable } from "mobx";
import { AdminUiStore } from "./AdminUiStore";
import { inject, injectable } from "inversify";
import { TYPES } from "../container/types";

@injectable()
export class RootStore {
  @inject(TYPES.dataStore) dataStore!: DataStore;
  @inject(TYPES.uiStore) uiStore!: UiStore;
  @inject(TYPES.adminUiStore) adminUiStore!: AdminUiStore;
  constructor() {
    makeAutoObservable(this);
  }
}
