import { Injectable } from '@angular/core';
import { ElectronService } from '../providers/electron.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private electron: ElectronService) {

  }

  set(object) {
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
}
