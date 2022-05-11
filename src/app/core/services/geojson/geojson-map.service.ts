import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { LocationService } from '../location/location.service';
import { FullLocation } from '../service.model';
import { locationFeatureMock } from './location-feature.mock';
import venue from './san-jose-convention-center.json';


/**
 * This service manages geojson maps.
 * It fetches, uploads and deletes geojson maps.
 */
@Injectable({
  providedIn: 'root'
})
export class GeojsonMapService {

  constructor(
    private locationService: LocationService,
  ) { }

  /**
   * Get geojson data of a map
   * @param mapId id of a map
   * @returns geojson data
   */
  getMap(mapId: string): Observable<GeoJSON.GeoJSON> {
    if (mapId === 'venue') {
      return of(venue as GeoJSON.GeoJSON);
    } else {
      return of(null);
    }
  }

  /**
   * Get a list of all locations that are assigned to features on the map
   * @param accountId accountId
   * @param mapId mapId
   * @param featureIds a list of features
   * @returns a list of locations
   */
  getLocations(accountId: string, mapId: string, featureIds: (string|number)[]): Observable<FullLocation[]> {
    const mocks = featureIds
      .map(fid => Object.entries(locationFeatureMock).find(entry => entry[1] === fid))
      .filter(mock => !!mock);
    if (!mocks.length) {
      return of([]);
    }
    return forkJoin(mocks.map(mock => this.locationService.getFullLocationById(mock[0], accountId, false)));
  }
}
