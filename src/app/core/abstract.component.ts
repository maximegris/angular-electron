import { Directive, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class AbstractComponent implements OnDestroy {

    protected destroyed$: Observable<boolean>;
    private destroySubject = new Subject<boolean>();

    constructor() {
        this.destroyed$ = this.destroySubject.asObservable();
    }

    ngOnDestroy(): void {
        this.destroySubject.next(true);
        this.destroySubject.complete();
        this.destroySubject.unsubscribe();
    }

}
