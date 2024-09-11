import {Component, OnInit} from '@angular/core';
import {ElectronService} from './core/services';
import {interval, map, tap} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    s = 0;

    constructor(
        private electronService: ElectronService,
    ) {
    }

    ngOnInit() {
        interval(1000).pipe(
            map((_: number) => {
                this.s++;
                return this.s.toString();
            }),
            tap(time => {
                this.electronService.updateTrayText(time);
            })
        ).subscribe()
    }
}
