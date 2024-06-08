import { Injectable } from '@angular/core';
import { StorageKey } from '../models/storage-key.model';

@Injectable({
  providedIn: 'root'
})
export class CustomStorageService {


  public set(key: StorageKey | string, object: any, storeInLocalStorage: boolean = true) {
    try {
     const objStr = window.btoa(encodeURIComponent(JSON.stringify(object)));
      const storage = storeInLocalStorage ? localStorage : sessionStorage;
      storage.setItem(key.toString(), objStr);

    } catch (err) {
      console.warn('Error storing object in session or local storage: ' + err);
    }
  }

  public get(key: StorageKey | string) {
    try {
      const objStr = localStorage.getItem(key.toString()) || sessionStorage.getItem(key.toString());
      if (!objStr) return null;
      const decodedStr = decodeURIComponent(window.atob(objStr));
      return JSON.parse(decodedStr);
    } catch (err) {
      return null;
    }
  }


  public remove(key: StorageKey | string): void {
    sessionStorage.removeItem(key.toString());
    localStorage.removeItem(key.toString());
  }

  public clearAllStorage(): void {
    this.clearLocalStorage();
    this.clearSessionStorage();
  }



  public clearLocalStorage(): void {
    localStorage.clear();
  }

  public clearSessionStorage() {
    sessionStorage.clear();
  }
}
