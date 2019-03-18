import { Injectable } from '@angular/core';
import { ElectronService } from '../providers/electron.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private electron: ElectronService) {
    console.log('Task Service running')
    if (process.platform === 'win32') {
      this.electron.tasklist().then(tasks => {
        console.log(tasks);
      });
    } else {
      this.electron.psNode.lookup({}, function (err, resultList) {
        if (err) {
          throw new Error(err);
        }

        var process = resultList[0];

        if (process) {

          console.log('PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments);
        }
        else {
          console.log('No such process found!');
        }
      });
    }
  }


}
