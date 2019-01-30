import { Injectable } from '@angular/core';
import { ElectronService } from '../providers/electron.service';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private electron: ElectronService) {

  }

  set(object: any) {
    const store = new this.electron.store();
    const promise = new Promise((resolve, reject) => {
      for (let prop in object) {
        // console.log(object[prop])
        store.set(prop, object[prop]);
      }
      resolve();
    });
    return promise;
  }

  get(key: string) {
    const store = new this.electron.store();
    return store.get(key)
  }
}
