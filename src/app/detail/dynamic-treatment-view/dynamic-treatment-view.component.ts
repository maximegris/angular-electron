import { Component, OnInit } from '@angular/core';
import { LngLatBoundsLike } from 'mapbox-gl';
import { finalize } from 'rxjs/operators';
import { AbstractComponent } from '../../core/abstract.component';
import { GeojsonMapService } from '../../core/services';
import { FullLocation } from '../../core/services/service.model';
import { findBounds, MapZoomEvent, MarkerClickEvent } from '../../shared/components/geojson-map/geojson-map.component';
import { ImdfFeature, ImdfProps, isLevelFeature, LevelFeature } from '../../shared/components/geojson-map/imdf.types';
import maxZoomInput from './max-zoom-markers.json';

const LEVEL1ID = '81e9fd76-b34a-45f6-a6dc-1f172f01e849';
const ZOOM_LEVEL_DETAILS = 17.8;
const MAP_ID = 'venue';

@Component({
  selector: 'app-dynamic-treatment-view',
  templateUrl: './dynamic-treatment-view.component.html',
  styleUrls: ['./dynamic-treatment-view.component.scss'],
})

export class DynamicTreatmentViewComponent extends AbstractComponent implements OnInit {

  geojson = null;
  showSpinner: boolean | string = true;

  selectedLevelId: string | number;

  mapMarkers: ImdfFeature<GeoJSON.Point>[] = [];
  mapSymbols: ImdfFeature<GeoJSON.Point>[] = [];

  maxZoomMarkers: ImdfFeature<GeoJSON.Point>[] = [];
  minZoomMarkers: ImdfFeature<GeoJSON.Point>[] = [];

  featuresWithLocations: Record<string, FullLocation> = {};
  featuresWithDevices: Record<string, ImdfFeature<GeoJSON.Point>[]> = {};

  lastClickedMarker: MarkerClickEvent = null;
  currZoomLevel: number;
  focusBounds: LngLatBoundsLike;
  uvaLogo: string;

  constructor(
    public mapService: GeojsonMapService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.showSpinner = 'Loading map data';
    this.mapService.getMap(MAP_ID).subscribe(
      map => {
        this.geojson = {
          type: 'FeatureCollection',
          // limit input data only to level 1
          features: (map as GeoJSON.FeatureCollection).features.filter(f => f.id === LEVEL1ID || f.properties?.level_id === LEVEL1ID)
        };

        // set initial level selected
        const levels = this.geojson.features.filter(f => isLevelFeature(f));
        if (levels.length) {
          this.onLevelChanged(levels[0] as unknown as LevelFeature<any>);
        }
        this.mapFeaturesToLocations();
      }
    );
  }

  /**
   * Find out what features are UVA levels
   */
  mapFeaturesToLocations() {
    this.showSpinner = 'Loading locations data';
    this.mapService.getLocations('todo', 'dynamic-demo', this.geojson.features.map(f => f.id)).pipe(
      finalize(() => this.showSpinner = false),
    ).subscribe(
      locations => {
        this.featuresWithLocations = {};
        locations.forEach(location => {
          this.featuresWithLocations[location.mapInfo.featureId] = location;
        });
        if (this.selectedLevelId) {
          this.onLevelChanged({id: this.selectedLevelId} as LevelFeature<any>);
        }
      }
    );
  }

  /**
   * When level changes I will
   * - remember actual sleected level
   * - find out what features on current level have UVA locations
   * - find out what location have devices in them
   * - create aggregated markers/clusters for locations with devices
   */
  onLevelChanged(level: LevelFeature<any>) {
    this.selectedLevelId = level?.id;
    const locationsOnLevel = this.geojson.features
                              .filter(f =>
                                f.properties.level_id === level.id &&
                                !!this.featuresWithLocations[f.id] &&
                                !!f.properties.display_point);
    this.featuresWithDevices = {};
    // take only those markers from input file that have 1 unit_id that points to a feature with location
    this.maxZoomMarkers = [];
    maxZoomInput.features.forEach(f => {
        if (f.properties?.unit_ids?.length === 1 && !!this.featuresWithLocations[f.properties.unit_ids[0]]) {
          this.maxZoomMarkers.push({
            type: 'Feature',
            id: f.id,
            feature_type: 'amenity',
            geometry: {
              type: 'Point',
              coordinates: f.geometry.coordinates,
            },
            properties: {
              ...f.properties,
              device_name: 'Device #' + Math.floor(Math.random() * 100),
            } as unknown as ImdfProps,
          });
        }
      });
    this.minZoomMarkers = locationsOnLevel.map(f => ({
      type: 'Feature',
      feature_type: 'anchor',
      id: f.id,
      geometry: {
        type: 'Point',
        coordinates: f.properties.display_point.coordinates,
      },
      properties: {
        ...f.properties,
        air_quality: Math.random() > 0.5 ? 'Good' : 'Bad',
        occupancy: Math.floor(Math.random() * 10),
      } as unknown as ImdfProps,
    } as ImdfFeature<GeoJSON.Point>));

    this.decideVisibleMarkers();
  }

  /**
   * Decide what markers to show based on the zoom level
   */
  decideVisibleMarkers() {
    if (this.currZoomLevel > ZOOM_LEVEL_DETAILS) {
      this.mapMarkers = null;
      this.mapSymbols = this.maxZoomMarkers;
    } else {
      this.mapMarkers = this.minZoomMarkers;
      this.mapSymbols = null;
    }
  }

  onMarkerClick(event: MarkerClickEvent) {
      console.log(event);
      // Clicking on an anchor marker will zoom the map such that the feature that contains clicked marker
      // will be centered on the map
      if (event.feature.feature_type === 'anchor') {
        // When creating anchor marker, I use the same id as for the parent feature
        const parentFeature = this.geojson.features.find(f => f.id === event.feature.id);
        this.focusBounds = findBounds([parentFeature]);
        // since this page has a panel covering it's left third, we will offset the bound to the right a bit
        const origWidth = this.focusBounds[2] - this.focusBounds[0];
        this.focusBounds[0] -= origWidth / 4;
        this.focusBounds[2] -= origWidth / 4;
      } else {
        this.lastClickedMarker = {
          ...event,
          lngLat: event.feature.geometry.coordinates
        };
      }
  }

  onMapClick(event: any) {
    console.log(event);
  }

  onMapZoom(evt: MapZoomEvent) {
    this.currZoomLevel = evt.zoomLevel;
    this.decideVisibleMarkers();
  }
}

export interface DeviceEvent {
  id: number,
  item: string,
  eventType: string,
  date: string
}

const EVENT_DATA: DeviceEvent[] =
  [
    { id: 1, item: 'Lamp', eventType: 'Removed', date: '12-22-2021' },
    { id: 2, item: 'Filter', eventType: 'Detected new', date: '12-22-2021' },
    { id: 3, item: 'Door', eventType: 'Opened', date: '12-22-2021' },
    { id: 4, item: 'Filter', eventType: 'Detected new', date: '12-22-2021' },
  ];

export class EventTable {
  displayedColumns: string[] = ['item', 'eventType', 'date'];
  dataSource = EVENT_DATA;
}