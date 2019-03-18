import { Injectable } from '@angular/core';
import { ElectronService } from '../providers/electron.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: any[];
  blocked: any = {};

  constructor(private electron: ElectronService) {
    console.log('Task Monitoring Service running')

  }

  getRunningTasks(): Promise<any[]> {
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

  monitorRunningApps() {
    const processObservable = new Observable(observer => {
      setInterval(async () => {
        let s = await this.filterProcesses();
        observer.next(s);
      }, 2000);
    });

    return processObservable;
  }

  blockedApps(sysProcess) {
    const list = this.getBlackListed();
    for (let app of list) {
      if (this.getSysProcess(sysProcess).toLowerCase().includes(app.toLowerCase()))
        return sysProcess;
    }
  }

  getSysProcess(sysProcess) {
    if (process.platform === 'win32') {
      return sysProcess.imageName;
    } else {
      return sysProcess.command;
    }
  }

  getBlackListed(): string[] {
    if (process.platform === 'win32')
      return this.electron.bannedApps.win;
    else if (process.platform === 'darwin')
      return this.electron.bannedApps.mac;
    else
      return ['screensho']; // linux :)
  }

  async filterProcesses() {
    let result: any[] = [];

    const tasks = await this.getRunningTasks();

    for (let sysProcess of tasks) {
      const blocked = this.blockedApps(sysProcess);
      if (blocked) {
        this.blocked = {
          exists: true,
          msg: `Please close ${this.getSysProcess(blocked)} while in the slideshow`
        }
        result.push(blocked);
      }

    }

    return await result;
  }


}
