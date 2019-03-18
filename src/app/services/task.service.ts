import { Injectable } from '@angular/core';
import { ElectronService } from '../providers/electron.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: any[];

  constructor(private electron: ElectronService) {
    console.log('Task Service running')
    this.getRunningTasks()
      .then(tasks => console.log(tasks))
      .catch(err => new Error(err))
  }


  getRunningTasks() {
    return new Promise((resolve, reject) => {
      if (process.platform === 'win32') {
        this.electron.tasklist()
          .then(tasks => {
            resolve(tasks);
          })
          .catch(err => reject(err))
      } else {
        this.electron.psNode.lookup({}, function (err, tasks) {
          if (err) {
            reject(err)
          }
          resolve(tasks);
        });
      }
    });
  }


}
