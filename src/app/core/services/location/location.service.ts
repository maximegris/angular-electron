import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { FullLocation } from '../service.model';
import { locationMocks } from './location.mocks';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() {
  }


  public getFullLocationById(locationId: string, accountId: string, ignoreCache: boolean): Observable<FullLocation> {
    if (locationMocks[locationId]) {
      return of(new FullLocation(locationMocks[locationId]));
    }
    return throwError(() => new Error('Location mock not found: ' + locationId));
  }

}