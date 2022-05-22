import { locationFeatureMock } from './geojson/location-feature.mock';

export interface User {
    id: string;
    name: string;
}

export interface LocationData {
    id?: string;
    name?: string;
    description?: string;
    type?: string;
    tags?: string[];

    immediateSublocations?: LocationData[];

    createdAt?: Date;
    createdBy?: User;
    updatedAt?: Date;
    updatedBy?: User;
    fullLocationPath?: LocationData[];
}

export interface MapInfo {
    mapId: string;
    featureId: string;
}

export class Location {
    readonly id: string;
    readonly name: string;
    readonly description?: string;
    readonly type?: string;
    readonly tags?: string[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly mapInfo?: MapInfo;

    constructor(data: LocationData | Location) {
        if (!data.id) {
            throw new Error(`Could not create LocationCore from data (${data}): missing id value`);
        }
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.type = data.type;
        if (Array.isArray(data.tags)) {
            this.tags = data.tags.filter(t => typeof t === 'string');
        }
        if (data.createdAt) {
            try {
                this.createdAt = new Date(data.createdAt);
            } catch (err) {
                console.error(err);
            }
        }
        if (data.updatedAt) {
            try {
                this.updatedAt = new Date(data.updatedAt);
            } catch (err) {
                console.error(err);
            }
        }
        // TODO: replace this fake map info with backend data
        const mapId = 'venue';
        if (locationFeatureMock[data.id]) {
            this.mapInfo = {
                mapId,
                featureId: locationFeatureMock[data.id]
            };
        }
    }
}

export class LocationWithSublocations extends Location {
    readonly immediateSublocations: Location[] = [];

    constructor(data: LocationData | LocationWithSublocations) {
        super(data);

        if (Array.isArray(data.immediateSublocations)) {
            this.immediateSublocations = (data.immediateSublocations as Array<LocationData|Location>)
                .map(l => { try { return new Location(l); } catch (e) { console.error(e); return null; }})
                .filter(l => l !== null);
        }
    }
}


export class FullLocation extends LocationWithSublocations {
    readonly fullLocationPath: LocationWithSublocations[];
    readonly updatedBy?: User;
    readonly createdBy?: User;

    // TODO: Deprecate / remove this once no longer needed
    floorMapUrl?: string;

    constructor(data: LocationData | FullLocation) {
        super(data);

        if (data.updatedBy) {
            try {
                this.updatedBy = data.updatedBy;
            } catch (e) { console.error(e); }
        }
        if (data.createdBy) {
            try {
                this.createdBy = data.createdBy;
            } catch (e) { console.error(e); }
        }

        if (Array.isArray(data.fullLocationPath)) {
            this.fullLocationPath = (data.fullLocationPath as Array<LocationData|LocationWithSublocations>)
                .map(l => { try { return new LocationWithSublocations(l); } catch (e) { console.error(e); return null; }})
                .filter(l => l !== null);
        }

        // TODO remove when backend works
        this.floorMapUrl = '/assets/floor-plans/floor-plan.svg';
    }

    /**
     * Get full location as a string separated by '/'
     */
    public get locationPath() {
        const path = this.fullLocationPath || [];
        return [...path.map(p => p.name), this.name].join('/');
    }
}

export class Device {
    id: string;
    type: 'UVA20' | 'AIR175' | 'AIR20';
    // where is the device installed, what location
    location: FullLocation;
    installationDate: Date;
    // is manual mode enabled?
    isManualMode: boolean;
    // device event history
    events: {
        // Lamp/Filter/Door/...
        part: string;
        // Removed/Opened/...
        action: string;
        // timestamp when event happened
        timestamp: Date;
    }[];
    name: string;

    constructor(initializer: Partial<Device> = {}) {
        Object.assign(this, initializer);
    }
}