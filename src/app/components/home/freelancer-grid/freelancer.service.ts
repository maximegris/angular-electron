import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, IFreelancer, ACTIONS } from './freelancers.reducer';
import { Http, Response } from '@angular/http';

@Injectable()
export class RealtimeFreelancersService {

  private USER_API_URL = 'https://randomuser.me/api/?results='

  constructor(private store: Store<AppState>, private http: Http) { }

  private toFreelancer(value: any) {
    return {
      name: value.name.first + ' ' + value.name.last,
      email: value.email,
      thumbnail: value.picture.thumbnail
    }
  }

  private random(y) {
    return Math.floor(Math.random() * y);
  }

  public run() {
    this.http.get(`${this.USER_API_URL}51`).subscribe((response) => {
      this.store.dispatch({
        type: ACTIONS.FREELANCERS_LOADED,
        payload: response.json().results.map(this.toFreelancer)
      })
    })

    setTimeout(() => {
      this.store.select('freelancers').first().subscribe((freelancers: Array<IFreelancer>) => {
        let getDeletedIndex = () => {
          return this.random(freelancers.length - 1)
        }
        this.http.get(`${this.USER_API_URL}${this.random(10)}`).subscribe((response) => {
          this.store.dispatch({
            type: ACTIONS.INCOMMING_DATA,
            payload: {
              ADD: response.json().results.map(this.toFreelancer),
              DELETE: new Array(this.random(6)).fill(0).map(() => getDeletedIndex()),
            }
          });
          this.addFadeClassToNewElements();
        });
      });
    }, 5000);
  }

  private addFadeClassToNewElements() {
    let elements = window.document.getElementsByClassName('freelancer');
    for (let i = 0; i < elements.length; i++) {
      if (elements.item(i).className.indexOf('fade') === -1) {
        elements.item(i).classList.add('fade');
      }
    }
  }
}


