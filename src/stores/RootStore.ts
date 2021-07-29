import { DataStore } from "./data-stores/DataStore";
import { UiStore } from "./UiStore";

export class RootStore {
    dataStore: DataStore;
    uiStore: UiStore;
    constructor() {
        this.dataStore = new DataStore(this);
        this.uiStore = new UiStore(this);
    }
}
