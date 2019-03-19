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
    let interval;
    const processObservable = new Observable(observer => {
      interval = setInterval(async () => {
        let s = await this.filterProcesses();
        observer.next(s);
      }, 2000);
      return { unsubscribe() { clearInterval(interval) } };
    });

    return processObservable;
  }

  blockedApps(sysProcess) {
    const list = this.electron.bannedApps.list
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

  round(num: number): number {
    return <number>Math.round(num * 10) / 10;
  }

  async filterProcesses() {
    let result: any[] = [];

    const t1 = performance.now();
    const tasks = await this.getRunningTasks();
    const t2 = performance.now();
    console.log('getRunningTasks call time (ms.): ', this.round((t2 - t1)))

    const t3 = performance.now();
    for (let sysProcess of tasks) {
      const blocked = this.blockedApps(sysProcess);
      if (blocked) {
        this.blocked = {
          exists: true,
          msg: `Please close ${this.getSysProcess(blocked).split("/").pop()} while in the slideshow`
        }
        result.push(blocked);
      }
    }
    const complete = await result;
    const t4 = performance.now();
    console.log('filterProcesses call time (ms.): ', this.round((t4 - t3)))

    return complete
  }


}
