import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, IFreelancer, ACTIONS } from './freelancers.reducer';
import { IFilter, ACTIONS as FilterACTIONS } from './../filter/filter.reducer';
import * as Rx from 'rxjs';

@Component({
  selector: 'app-freelancer-grid',
  templateUrl: './freelancer-grid.component.html',
  styleUrls: ['./freelancer-grid.component.scss']
})

export class FreelancerGridComponent implements OnInit {

  public freelancers: Rx.Observable<Array<IFilter>>;
  public filter: Rx.Observable<IFilter>;

  constructor(private store: Store<AppState>) {
    this.freelancers = Rx.Observable.combineLatest(store.select('freelancers'),
                                                   store.select('filter'), this.applyFilter);
  }

  applyFilter(freelancers: Array<IFreelancer>, filter: IFilter): Array<IFreelancer> {
    return freelancers
      .filter(x => !filter.name || x.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1)
      .filter(x => !filter.email || x.email.toLowerCase().indexOf(filter.email.toLowerCase()) !== -1)
  }

  delete(freelancer) {
    this.store.dispatch({
      type: ACTIONS.DELETE_FREELANCER,
      payload: freelancer,
    })
  }

  ngOnInit() {
  }
}

