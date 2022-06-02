import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CirclePaint, LngLatBoundsLike,
  LngLatLike,
  Map,
  MapboxGeoJSONFeature,
  MapLayerMouseEvent,
  MapMouseEvent,
  MapTouchEvent,
  NavigationControl,
  PointLike
} from 'mapbox-gl';
import { asyncScheduler } from 'rxjs';
import { AbstractComponent } from '../../../core/abstract.component';
import { ImdfFeature, ImdfProps, isLevelFeature, LevelFeature } from './imdf.types';

export interface MarkerClickEvent {
  clientX: number;
  clientY: number;
  lngLat: LngLatLike;
  feature: ImdfFeature<any>;
}

export interface MapZoomEvent {
  zoomLevel: number;
  zoomStart: boolean;
  zoomEnd: boolean;
}

export interface MapSymbolImage {
  id: string;
  url: string;
}

const FEATURE_BACKGROUND_COLOR_NEUTRAL = '#e4eaed';
const FEATURE_BACKGROUND_COLOR_HOVERED = '#c8dbe6';

@Component({
  selector: 'uvc-geojson-map',
  templateUrl: './geojson-map.component.html',
  styleUrls: ['./geojson-map.component.scss']
})
export class GeoJsonMapComponent extends AbstractComponent {

  @Input()
  showSpinner: boolean | string;

  @Input()
  showPoi = false;

  /**
   * input is a geojson that contains FeatureCollection.
   */
  @Input()
  set geojson(input: GeoJSON.GeoJSON) {
    this.input = null;
    // schedule input processing to give Angular chance to show spinner
    asyncScheduler.schedule(() => this.processInput(input));
  }
  input: GeoJSON.FeatureCollection;

  /**
   * Portion of a map that is supposed to be shown on the map.
   * If not provided, it is calculated to cover all input features.
   */
  @Input()
  bounds: LngLatBoundsLike;

  /**
   * Sets or clears the map's geographical bounds.
   * Pan and zoom operations are constrained within these bounds.
   */
  @Input()
  maxBounds: LngLatBoundsLike;

  /**
   * If true highlights features under mouse pointer
   */
  @Input()
  trackMouse = true;

  /**
   * Paint of all general features (rooms)
   */
  @Input()
  paint = {
    'fill-color': [
      'case', ['boolean', ['feature-state', 'hover'], false],
      ['case', ['has', 'fill-color-hovered'], ['get', 'fill-color-hovered'], FEATURE_BACKGROUND_COLOR_HOVERED],
      ['case', ['has', 'fill-color'], ['get', 'fill-color'], FEATURE_BACKGROUND_COLOR_NEUTRAL],
    ],
    'fill-outline-color': ['case', ['has', 'fill-outline-color'], ['get', 'fill-outline-color'], '#627BC1'],
  };

  /**
   * Paint of room walls
   */
  @Input()
  linePaint = {
    'line-color': '#627BC1',
    'line-width': 1.75,
    'line-opacity': .4
  }

  /**
   * Paint of all openings (e.g. doors)
   */
  @Input()
  openingsPaint = {
    'line-color': ['case', ['has', 'fill-color'], ['get', 'fill-color'], FEATURE_BACKGROUND_COLOR_NEUTRAL],
    // opening line-width should be larger than linePaint line-width otherwise it will not be visible
    'line-width': 3,
  }

  /**
   * Paint for selected feature 
   * Default: "UVAngel blue"
   */
  @Input()
  selectedPaint = {
    'fill-color': ['case', ['has', 'selected-fill-color'], ['get', 'selected-fill-color'], 'rgba(0, 147, 199, 0.5)'],
    'fill-outline-color': ['case', ['has', 'selected-fill-outline-color'], ['get', 'selected-fill-outline-color'], 'rgba(0, 147, 199, 1)']
  };

  /**
   * Paint for markers
   */
  @Input()
  markerPaint: CirclePaint = {
    // circle-color can be taken from feature properties
    'circle-color': ['case', ['has', 'circle-color'], ['get', 'circle-color'], '#4264fb'],
    'circle-radius': 4,
    'circle-stroke-width': 2,
    'circle-stroke-color': ['case', ['has', 'circle-stroke-color'], ['get', 'circle-stroke-color'], '#ffffff']
  };

  /**
   * If true then when changing selected feature, selected level will be changed too.
   */
  @Input()
  tieLevelToFeature = true;

  @Input()
  set selectedFeatureId(featureId: string | number) {
    this._selectedFeatureId = featureId;
    if (!featureId) {
      this.selectedFeature = null;
      return;
    }

    this.selectedFeature = this.allFeatures?.find(f => f.id === featureId);
    if (this.tieLevelToFeature) {
      if (this.selectedFeature?.properties?.level_id) {
        this.selectedLevelId = this.selectedFeature.properties.level_id;
      } else if (this.selectedFeature?.feature_type === 'level') {
        this.selectedLevelId = this.selectedFeature.id;
      } else {
        this.selectedLevelId = null;
      }
    }
  }
  _selectedFeatureId: string | number;

  @Input()
  set selectedLevelId(levelId: string | number) {
    this._selectedLevelId = levelId;
    if (!levelId) {
      this.selectedLevel = null;
      return;
    }

    this.selectedLevel = this.levelFeatures?.find(l => l.id === levelId);
  }
  _selectedLevelId: string | number;

  @Input()
  showLevelPicker = true;

  /**
   * Event in case user clicks on a feature on the map
   */
  @Output()
  mapClick = new EventEmitter<ImdfFeature<any>[]>();

  @Output()
  markerClick = new EventEmitter<MarkerClickEvent>();

  @Output()
  mapZoom = new EventEmitter<MapZoomEvent>();

  @Output()
  // TODO: create interface
  mouseDown = new EventEmitter<unknown>();

  @Output()
  // TODO: create interface
  wheel = new EventEmitter<unknown>();

  /**
   * Event in case user clicks on a level picker
   */
  @Output()
  selectLevel = new EventEmitter<LevelFeature<any>>();

  @Input()
  set markers(items: ImdfFeature<GeoJSON.Point>[]) {
    this._markers = {
      type: 'FeatureCollection',
      features: items || []
    };
    items?.forEach(item => this.addFeatureProps(item));
  }
  get markers() {
    return this._markers?.features as ImdfFeature<GeoJSON.Point>[];
  }
  _markers: GeoJSON.FeatureCollection;

  @Input()
  set symbols(items: ImdfFeature<GeoJSON.Point>[]) {
    this._symbols = {
      type: 'FeatureCollection',
      features: items || []
    };
    items?.forEach(item => this.addFeatureProps(item));
  }
  get symbols() {
    return this._symbols?.features as ImdfFeature<GeoJSON.Point>[];
  }
  _symbols: GeoJSON.FeatureCollection;

  @Input()
  symbolImage: string | MapSymbolImage[];

  /**
   * Configuration of symbol layer layout
   * @see https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#symbol
   */
  @Input()
  set symbolLayout(layout: Record<string, any>) {
    this._symbolLayout = {
      ...layout,
      // this has to be hard-coded because other parts rely on it
      'icon-allow-overlap': true,
      'icon-image': ['case', ['has', 'icon-image'], ['get', 'icon-image'], 'uva-symbol-image'],
    };
  }
  _symbolLayout: Record<string, any> = {
    'icon-allow-overlap': true,
    'icon-image': 'uva-symbol-image',
  };

  @Input()
  popupLocation: LngLatLike = null;

  @Input()
  popupOffset: number | PointLike;

  @Input()
  showNavigationControls = false;

  allFeatures: ImdfFeature<any>[];
  levelFeatures: LevelFeature<any>[];
  selectedFeature: ImdfFeature<any>;
  selectedLevel: LevelFeature<any>;

  hoveredFeature: MapboxGeoJSONFeature;
  symbolImageLoaded = false;

  mapboxMap: Map;

  readonly Array = Array;

  constructor() {
    super();
  }

  processInput(input: GeoJSON.GeoJSON) {
    this.input = null;
    this.allFeatures = [];
    this.selectedFeature = null;
    this.levelFeatures = [];

    if (!input || input.type !== 'FeatureCollection') {
      console.error('Geojson must be of "FeatureCollection" type!');
    } else {
      this.input = input as GeoJSON.FeatureCollection;

      this.extractFeatures();

      if (!this.bounds) {
        this.bounds = findBounds(this.allFeatures);
      }

      // let max bounds show 2x width & height of feature bounds
      const width = (this.bounds[2] - this.bounds[0]);
      const height = (this.bounds[3] - this.bounds[1]);
      this.maxBounds = [
        this.bounds[0] - width,
        this.bounds[1] - height,
        this.bounds[2] + width,
        this.bounds[3] + height,
      ];

      // Re-select feature and/or level in case their setters were called before input geojson was processed
      if (this._selectedLevelId) {
        this.selectedLevelId = this._selectedLevelId;
      }
      if (this._selectedFeatureId) {
        this.selectedFeatureId = this._selectedFeatureId;
      }
    }
  }

  /**
   * Process input geojson data and extract features from it
   */
  extractFeatures() {
    let idGenerator = 0;

    // TODO: maybe we want to ignore non-polygonal features???

    this.input.features.forEach((rawFeature: ImdfFeature<any>) => {
      // TODO check if feature id exists and is unique
      this.allFeatures.push(rawFeature);

      rawFeature.id = rawFeature.id ?? `feature${idGenerator++}`;

      this.addFeatureProps(rawFeature);

      if (isLevelFeature(rawFeature)) {
        this.levelFeatures.push(rawFeature);
      }
    });
    this.levelFeatures.sort((a, b) => b.properties.ordinal - a.properties.ordinal);
  }

  private addFeatureProps(rawFeature: ImdfFeature<any>) {
    // mapbox bug: feature id must be number. Since our ids are strings, we copy them inside feature properties
    const props = rawFeature.properties || {} as ImdfProps;
    props.uva_id = rawFeature.id.toString();
    // TODO: I want to get rid of this.
    // I copy feature_type into properties because I do not know how to write mapbox filter expression that uses feature_type otherwise
    (props as any).feature_type = rawFeature.feature_type;
    rawFeature.properties = props;
  }

  get spinnerHasText() {
    return this.showSpinner && typeof this.showSpinner === 'string';
  }

  onMapClick(event: MapLayerMouseEvent) {
    if (event instanceof PointerEvent) {
      // mapbox seems to emit 2 events on click: MapLayerMouseEvent and then PointerEvent. PointerEvent is to be ignored.
      return;
    }

    const renderedFeatures = this.mapboxMap.queryRenderedFeatures(event.point, {
      layers: ['uva-symbols-layer', 'uva-markers-layer', 'uva-all-layer']
    });
    if (renderedFeatures.some(feature => feature.layer.id === 'uva-symbols-layer' || feature.layer.id === 'uva-markers-layer')) {
      // there are symbols/markers on this point so we ignore this event
      console.debug('Ignoring map click');
      return;
    }

    if (renderedFeatures.length) {
      // Elements of rendered features are not the same features that I pass to mapbox.
      // On top of that mapbox strips away ids from features.
      // Here I have to find feature by matching it to uva_id in properties of feature retuned in event data.
      const features = renderedFeatures
                            .map(feature => this.allFeatures.find(item => item.id === feature.properties.uva_id))
                            .filter(item => !!item);
      if (features.length) {
        this.mapClick.emit(features);
        return;
      }
    }

    // Click outside of any map feature
    this.mapClick.emit([]);
  }

  onMouseMove(event: MapLayerMouseEvent) {
    event.target.getCanvas().style.cursor = 'pointer';
    if (!this.trackMouse) {
      return;
    }
    if (event.features.length > 0) {
      if (this.hoveredFeature) {
        event.target.removeFeatureState(this.hoveredFeature, 'hover');
        this.hoveredFeature = null;
      }
      if ((event.features[0].properties as ImdfProps)?.hoverable !== false) {
        this.hoveredFeature = event.features[0];
        event.target.setFeatureState(this.hoveredFeature, { hover: true });
      }
    }
  }

  onMouseLeave(event: MapLayerMouseEvent) {
    event.target.getCanvas().style.cursor = 'default';
    if (!this.trackMouse) {
      return;
    }
    if (this.hoveredFeature) {
      event.target.removeFeatureState(this.hoveredFeature, 'hover');
    }
    this.hoveredFeature = null;
  }

  /**
   * By default if there is no observer of "selectLevel" output we change the selected level id.
   * If there is an obseever we let him handle the event.
   */
  onSelectLevel(level: LevelFeature<any>) {
    if (this.selectLevel.observers.length) {
      this.selectLevel.emit(level);
    } else {
      this.selectedLevelId = level.id;
    }
  }

  onMarkerClick(event: MapLayerMouseEvent) {
    if (event.features?.length) {
      // Elements of event.features are not the same events that I pass to mapbox.
      // On top of that mapbox strips away ids from features.
      // Here I have to find feature by matching it to uva_id in properties of feature retuned in event data.
      const features = event.features
                            .map(feature => this.markers.find(item => item.id === feature.properties.uva_id))
                            .filter(item => !!item);
      if (features.length) {
        this.markerClick.emit({
          feature: features[0],
          lngLat: event.lngLat,
          clientX: event.originalEvent.clientX,
          clientY: event.originalEvent.clientY,
        });
      }
    }
  }

  onSymbolClick(event: MapLayerMouseEvent) {
    if (event.features?.length) {
      // Elements of event.features are not the same events that I pass to mapbox.
      // On top of that mapbox strips away ids from features.
      // Here I have to find feature by matching it to uva_id in properties of feature retuned in event data.
      const features = event.features
                            .map(feature => this.symbols.find(item => item.id === feature.properties.uva_id))
                            .filter(item => !!item);
      if (features.length) {
        this.markerClick.emit({
          feature: features[0],
          lngLat: event.lngLat,
          clientX: event.originalEvent.clientX,
          clientY: event.originalEvent.clientY,
        });
      }
    }
  }

  onZoom(evt: MapMouseEvent | MapTouchEvent, start = false, end = false) {
    this.mapZoom.emit({
      zoomEnd: end,
      zoomStart: start,
      zoomLevel: evt.target.getZoom(),
    });
  }

  onMapLoad(map: Map) {
    this.mapboxMap = map;
    // disable unwanted map layers
    map.setLayoutProperty('poi-label', 'visibility', this.showPoi ? 'visible' : 'none');
    map.setLayoutProperty('transit-label', 'visibility', this.showPoi ? 'visible' : 'none');
    map.setLayoutProperty('natural-point-label', 'visibility', this.showPoi ? 'visible' : 'none');
    map.setLayoutProperty('natural-line-label', 'visibility', this.showPoi ? 'visible' : 'none');
    map.setLayoutProperty('water-point-label', 'visibility', this.showPoi ? 'visible' : 'none');
    map.setLayoutProperty('water-line-label', 'visibility', this.showPoi ? 'visible' : 'none');
    map.setLayoutProperty('waterway-label', 'visibility', this.showPoi ? 'visible' : 'none');
    map.setLayoutProperty('building-number-label', 'visibility', this.showPoi ? 'visible' : 'none');
    map.setLayoutProperty('road-label', 'visibility', this.showPoi ? 'visible' : 'none');
    map.setLayoutProperty('road-number-shield', 'visibility', this.showPoi ? 'visible' : 'none');
    map.setLayoutProperty('road-exit-shield', 'visibility', this.showPoi ? 'visible' : 'none');
    map.setLayoutProperty('airport-label', 'visibility', this.showPoi ? 'visible' : 'none');
    map.setLayoutProperty('level-crossing', 'visibility', this.showPoi ? 'visible' : 'none');
    // Angular wrapper for mapbox-gl doesn't allow setting visualizePitch attribute.
    // Here I set that attribute inside mapbox-gl controls array.
    // NOTE: I touch on mapbox-gl internals. This may break in future.
    const navigationCtrl = (map as any)?._controls?.find(ctrl => ctrl instanceof NavigationControl);
    if (navigationCtrl?.options) {
      navigationCtrl.options.visualizePitch = true;
    }
    if (navigationCtrl?._compass) {
      navigationCtrl._compass.addEventListener('click', () => {
        // reset zoom -> show all features
        this.bounds = findBounds(this.allFeatures);
        map.resetNorth();
        map.resetNorthPitch();
      });
    }
  }

  onSymbolImageLoaded(imageId: string) {
    if (typeof this.symbolImage === 'string') {
      this.symbolImageLoaded = true;
    } else {
      const image = this.symbolImage.find(image => image.id === imageId);
      (image as any).loaded = true;
      this.symbolImageLoaded = this.symbolImage.every((image: any) => image.loaded);
    }
  }

  repaint() {
    // this doesn't repaint features
    //this.mapboxMap?.triggerRepaint();
    this.input = {...this.input};
  }

}

/**
 * Look through all features' geometries and find a rectangle/bound that contains all points.
 */
export function findBounds<G extends GeoJSON.Geometry>(features: ImdfFeature<G>[]): LngLatBoundsLike {
  // tslint:disable-next-line: no-var-keyword one-variable-per-declaration
  var lngLow: number, lngHigh: number, latLow: number, latHigh: number;

  const considerPosition = (pos: GeoJSON.Position) => {
    if (lngLow === undefined || pos[0] < lngLow) {
      lngLow = pos[0];
    }
    if (lngHigh === undefined || pos[0] > lngHigh) {
      lngHigh = pos[0];
    }
    if (latLow === undefined || pos[1] < latLow) {
      latLow = pos[1];
    }
    if (latHigh === undefined || pos[1] > latHigh) {
      latHigh = pos[1];
    }
  };

  const considerGeometry = (geometry: GeoJSON.Geometry) => {
    switch (geometry?.type) {
      case 'Point':
        considerPosition(geometry.coordinates);
        break;
      case 'Polygon':
        geometry.coordinates.forEach(posArray => posArray.forEach(pos => considerPosition(pos)));
        break;
      case 'LineString':
        geometry.coordinates.forEach(pos => considerPosition(pos));
        break;
      case 'MultiPoint':
        geometry.coordinates.forEach(pos => considerPosition(pos));
        break;
      case 'MultiLineString':
        geometry.coordinates.forEach(posArray => posArray.forEach(pos => considerPosition(pos)));
        break;
      case 'MultiPolygon':
        geometry.coordinates.forEach(polyArray => polyArray.forEach(posArray => posArray.forEach(pos => considerPosition(pos))));
        break;
      default:
        // ignore unknown geometry
    }
  };

  features.forEach(feature => considerGeometry(feature.geometry));

  return [lngLow, latLow, lngHigh, latHigh];
}

