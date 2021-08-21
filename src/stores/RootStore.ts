import { DataStore } from "./data-stores/DataStore";
import { UiStore } from "./UiStore";
import { makeAutoObservable } from "mobx";
import { AdminUiStore } from "./AdminUiStore";
import { inject, injectable } from "inversify";
import { TYPES } from "../container/types";

@injectable()
export class RootStore {
  @inject(TYPES.adminUiStore) public adminUiStore!: AdminUiStore
  @inject(TYPES.uiStore) public uiStore!: UiStore
  @inject(TYPES.dataStore) public dataStore!: DataStore
  constructor(
  ) {
    makeAutoObservable(this);
  }
}
