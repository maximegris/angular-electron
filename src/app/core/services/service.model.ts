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
        } else if (Math.random() > 0.2) {
            const featureMap = {
                venue: [
                    '9aab1fa4-8e7e-47b1-a40f-8269047ccd40',
                    '4b95cf80-d27b-438a-9294-0776976c97fe',
                    'b6f87afb-358d-43d0-93c7-43336d5ba8a1',
                    '3beb9daf-68fc-40b0-84d3-d5c42277e755',
                    '29e48c4d-da06-4a64-a810-9597adb4fc6b',
                    'b3a74ebf-d538-4e9b-ac98-b17ce57d3201',
                    '2b42921c-895b-4e2a-86dd-75915a28c987',
                    '74a29cfa-f995-4ce2-aba8-b1c7f18d5d95',
                    '947db578-5521-47ee-9938-07aa92a01659',
                    '81d42240-5191-499b-bd41-06f0227d4016'
                ],
            };
            this.mapInfo = {
                mapId,
                featureId: featureMap[mapId][Math.floor((Math.random() * (featureMap[mapId].length - 1)))]
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

    constructor(initializer: Partial<Device> = {}) {
        Object.assign(this, initializer);
    }
}