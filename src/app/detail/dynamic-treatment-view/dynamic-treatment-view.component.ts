import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LngLatBoundsLike } from 'mapbox-gl';
import { finalize } from 'rxjs/operators';
import { AbstractComponent } from '../../core/abstract.component';
import { GeojsonMapService } from '../../core/services';
import { DeviceService } from '../../core/services/device/device.service';
import { EnvironmentService } from '../../core/services/environment/environment.service';
import { Device, FullLocation } from '../../core/services/service.model';
import { findBounds, MapZoomEvent, MarkerClickEvent } from '../../shared/components/geojson-map/geojson-map.component';
import { ImdfFeature, ImdfProps, isLevelFeature, LevelFeature } from '../../shared/components/geojson-map/imdf.types';
import maxZoomInput from './max-zoom-markers.json';

const LEVEL1ID = '81e9fd76-b34a-45f6-a6dc-1f172f01e849';
// the current walue represents zoom level when the exterior walkway is focused.
// it is the largest feature with devices for which we want to show details
const ZOOM_LEVEL_DETAILS = 17.6779015450;
const MAP_ID = 'venue';

@Component({
  selector: 'app-dynamic-treatment-view',
  templateUrl: './dynamic-treatment-view.component.html',
  styleUrls: ['./dynamic-treatment-view.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(-20%)', opacity: 0 }),
          animate('200ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateX(0)', opacity: 1 }),
          animate('200ms', style({ transform: 'translateX(20%)', opacity: 0 }))
        ])
      ]
    )
  ],
})

export class DynamicTreatmentViewComponent extends AbstractComponent implements OnInit, OnDestroy {
  geojson = null;
  showSpinner: boolean | string = true;

  selectedLevelId: string | number;
  selectedFeatureId: string | number;

  mapMarkers: ImdfFeature<GeoJSON.Point>[] = [];
  mapSymbols: ImdfFeature<GeoJSON.Point>[] = [];

  maxZoomMarkers: ImdfFeature<GeoJSON.Point>[] = [];
  minZoomMarkers: ImdfFeature<GeoJSON.Point>[] = [];

  featuresWithLocations: Record<string, FullLocation> = {};
  featuresWithDevices: Record<string, Device> = {};

  lastClickedMarker: MarkerClickEvent = null;
  currZoomLevel: number;
  focusBounds: LngLatBoundsLike;

  sidePanelVisibility: {
    device: boolean,
    room: boolean,
    floor: boolean
  } = { device: false, room: false, floor: true };

  constructor(
    private env: EnvironmentService,
    public mapService: GeojsonMapService,
    public deviceService: DeviceService,
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
        this.disableHoverForDevicelessFeatures();
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

  disableHoverForDevicelessFeatures() {
    this.geojson.features.forEach(feature => {
      const props: ImdfProps = (feature.properties || {}) as ImdfProps;
      props.hoverable = !!this.featuresWithDevices[feature.id];
      feature.properties = props;
    });
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
    let counter = 0;
    maxZoomInput.features.forEach(f => {     
      if (f.properties?.unit_ids?.length === 1 && this.featuresWithLocations[f.properties.unit_ids[0]]) {
        const parentRoomFeatureId = f.properties.unit_ids[0];
        const deviceLocation = this.featuresWithLocations[parentRoomFeatureId];
        this.maxZoomMarkers.push({
          type: 'Feature',
          id: f.id,
          //id: 'Device' + counter,
          feature_type: 'amenity',
          geometry: {
            type: 'Point',
            coordinates: f.geometry.coordinates,
          },
          properties: {
            ...f.properties,
            device_name: 'Device #' + counter++,
            'icon-image': 'air20-image',
          } as unknown as ImdfProps,
        });

        this.featuresWithDevices[parentRoomFeatureId] = this.deviceService.generateDeviceMock(f.id, f.properties.device_name, deviceLocation);
      }
    });
      //console.log(this.maxZoomMarkers);
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
        // air_quality: Math.random() > 0.5 ? 'Good' : 'Bad',
        occupancy: Math.floor(Math.random() * 10),
      } as unknown as ImdfProps,
    } as ImdfFeature<GeoJSON.Point>));

    this.decideVisibleMarkers();

    this.env.setCurrentLocation(this.featuresWithLocations[level.id]);
    this.setSidePanelVisibility('floor');
  }

  /**
   * Decide what markers to show based on the zoom level
   */
  decideVisibleMarkers() {
    if (this.currZoomLevel > ZOOM_LEVEL_DETAILS) {
      this.showDeviceMarkers()
    } else {
      this.showRoomMarkers();
    }
  }

  showRoomMarkers() {
    this.mapMarkers = this.minZoomMarkers;
    this.mapSymbols = null;
  }

  showDeviceMarkers() {
    this.mapMarkers = null;
    this.mapSymbols = this.maxZoomMarkers;
  }

  onMarkerClick(event: MarkerClickEvent) {
      console.log(event);
      // Clicking on an anchor marker will zoom the map such that the feature that contains clicked marker
      // will be centered on the map
      if (event.feature.feature_type === 'anchor') {
        // When creating anchor marker, I use the same id as for the parent feature
        const parentFeature = this.geojson.features.find(f => f.id === event.feature.id);
        this.focusOnFeatures([parentFeature]);
        this.env.setCurrentLocation(this.featuresWithLocations[parentFeature.id]);
        this.selectedFeatureId = parentFeature.id;
        this.setSidePanelVisibility('room');
      } else {
        // Amenity/Device markers use unit_ids property to refer to their parent features
        const parentFeature = this.geojson.features.find(f => f.id === (event.feature.properties as any).unit_ids[0]);
        this.focusOnFeatures([parentFeature]);
        this.lastClickedMarker = {
          ...event,
          // always create a new array otherwise change detection will not detect the same popup reopening
          lngLat: [...event.feature.geometry.coordinates] as [number, number]
        };
        this.env.setCurrentDevice(this.deviceService.getDevice(event.feature.id as string));
        this.selectedFeatureId = parentFeature.id;
        this.setSidePanelVisibility('device');
      }
  }

  onMapClick(features: ImdfFeature<GeoJSON.Geometry, ImdfProps>[]) {
    this.selectedFeatureId = null;
    // only features with devices in them are selectable
    if (features.length && this.featuresWithDevices[features[0].id]) {
      console.log('Feature id = ', features[0].id);
      this.focusOnFeatures(features);
      if (this.featuresWithLocations[features[0].id]) {
        // clicked feature is a UVA location
        this.env.setCurrentLocation(this.featuresWithLocations[features[0].id]);
        this.setSidePanelVisibility('room');

        if (this.featuresWithDevices[features[0].id]) {
          // only select those features that have devices in them
          this.selectedFeatureId = features[0].id;
        }
      } else {
        this.setSidePanelVisibility();
      }
    } else {
      this.focusOnFeatures(this.geojson.features);
      this.env.setCurrentLocation(this.featuresWithLocations[LEVEL1ID]);
      this.setSidePanelVisibility('floor');
    }
  }

  focusOnFeatures(features: ImdfFeature<GeoJSON.Geometry, any>[]) {
    this.focusBounds = findBounds(features);
    // since this page has a panel covering it's left third, we will offset the bound to the right a bit
    const origWidth = this.focusBounds[2] - this.focusBounds[0];
    this.focusBounds[0] -= origWidth / 4;
    this.focusBounds[2] -= origWidth / 4;
  }

  onMapZoom(evt: MapZoomEvent) {
    this.currZoomLevel = evt.zoomLevel;
    this.decideVisibleMarkers();
  }

  public toggle(event: MatSlideToggleChange) {
    console.log(event.checked)
    const controlPanel = document.getElementById('uvaEnviroControlPanel')
  }

  setSidePanelVisibility(panelToShow: 'device' | 'room' | 'floor' | undefined = undefined) {
    this.sidePanelVisibility.device = false;
    this.sidePanelVisibility.room = false;
    this.sidePanelVisibility.floor = false;

    switch (panelToShow) {
      case 'device':
        this.sidePanelVisibility.device = true;
        break;
      case 'room':
        this.sidePanelVisibility.room = true;
        break;
      case 'floor':
        this.sidePanelVisibility.floor = true;
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
      super.ngOnDestroy();
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