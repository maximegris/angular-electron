export interface ImdfProps {
    name?: Record<string, string>;
    // copy of feature id copied inside properties because Mapbox doesn't support string ids
    uva_id: string;
    // points to id of a level feature if present
    level_id?: string;
    // A point representing visual center of the feature. A good place to put a marker on.
    display_point?: {
      coordinates: GeoJSON.Position;
    };
}


export type ImdfFeature<G extends GeoJSON.Geometry, P extends ImdfProps = ImdfProps> = GeoJSON.Feature<G, P> & { feature_type: string };
export interface LevelProps extends ImdfProps {
  // level/floor number
  ordinal: number;
}
export type LevelFeature<G extends GeoJSON.Geometry> = ImdfFeature<G, LevelProps>;

export function isLevelFeature(feature: ImdfFeature<any, any>): feature is LevelFeature<any> {
    return feature?.feature_type === 'level';
}
