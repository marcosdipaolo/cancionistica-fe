import { injectable } from "inversify";


export enum StoredItem {
  loggedUser = "loggedUser",
  unauthorizedRoute = "unauthorizedRoute"
}

export interface ILocalStorageService {
  getStoredItem(item: StoredItem): string | null;
  clearStoredItem(item: StoredItem): void;
  setStoredItem(item: StoredItem, value: string): void;
}

@injectable()
export class LocalStorageService implements ILocalStorageService {
  getStoredItem(item: StoredItem): string | null {
    return window.localStorage.getItem(item);
  }

  clearStoredItem(item: StoredItem): void {
    window.localStorage.removeItem(item);
  }

  setStoredItem(item: StoredItem, value: string): void {
    window.localStorage.setItem(item, value);
  }
}