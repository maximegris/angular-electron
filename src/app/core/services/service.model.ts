import { BehaviorSubject, Observable } from 'rxjs';
import { locationFeatureMock } from './geojson/location-feature.mock';
import { differenceInSeconds } from 'date-fns'

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

const AIR_QUALITY_TREND_CHANGE_SECONDS = 45

type AirQualityInfluencers = 'occupancy-high' | 'occupancy-low' | 'temp-high' | 'temp-low' |
    'voc-high' | 'humidity-low' | 'humidity-high'

export class Location {
    readonly id: string;
    readonly name: string;
    readonly description?: string;
    readonly type?: string;
    readonly tags?: string[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly mapInfo?: MapInfo;

    private activeInterval = null;

    currentAirQualityIssueSources?: AirQualityInfluencers[] = [];

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

        if (!this.activeInterval) {
            this.randomizeLocationAirQuality()
            this.activeInterval = setInterval(() => {
                this.randomizeLocationAirQuality()
            }, AIR_QUALITY_TREND_CHANGE_SECONDS * 1000)
        }
    }

    randomizeLocationAirQuality() {
        let roomOptions: AirQualityInfluencers[][] = [
            [],
            ['temp-high', 'humidity-high', 'occupancy-high'],
            ['temp-low', 'humidity-low'],
            ['humidity-high', 'voc-high'],
            ['occupancy-low'],
            ['occupancy-high', 'voc-high'],
            ['occupancy-high', 'voc-high', 'humidity-high', 'temp-high']
        ]
        let roomScenarioIndex = Math.round(Math.random() * roomOptions.length - 1)
        this.currentAirQualityIssueSources = roomOptions[roomScenarioIndex]
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

export interface TimestampedNumericalDatapoint {
    value: number,
    timestamp: Date
}
export interface RollingEnvironmentalData {
    temperature?: {
        minValue: number,
        maxValue: number,
        maxDeltaPerInterval: number,
        data: TimestampedNumericalDatapoint[]
    },
    humidity?: {
        minValue: number,
        maxValue: number,
        maxDeltaPerInterval: number,
        data: TimestampedNumericalDatapoint[]
    },
    voc?: {
        minValue: number,
        maxValue: number,
        maxDeltaPerInterval: number,
        data: TimestampedNumericalDatapoint[]
    },
    occupancy?: {
        minValue: number,
        maxValue: number,
        maxDeltaPerInterval: number,
        data: TimestampedNumericalDatapoint[]
    }
}

export interface DeviceEvent {
    // Lamp/Filter/Door/...
    part: string;
    // Removed/Opened/...
    action: string;
    // timestamp when event happened
    timestamp: Date;
}


export class Device {
    id: string;
    type: 'UVA20' | 'AIR175' | 'AIR20';
    // where is the device installed, what location
    location: FullLocation;
    installationDate: Date;
    // device event history
    events: DeviceEvent[];
    name: string;

    private maxEvents = 7;
    private maxEventSecondsTilClear = 30;
    private historicalMinutes = 60;
    private dataGenerationInterval;

    private $environmentalData: BehaviorSubject<RollingEnvironmentalData> = new BehaviorSubject(null);
    public readonly environmentalData: Observable<RollingEnvironmentalData> = this.$environmentalData.asObservable();

    constructor(initializer: Partial<Device> = {}) {
        Object.assign(this, initializer);
        this.$environmentalData.next({
            temperature: {
                minValue: 60,
                maxValue: 90,
                maxDeltaPerInterval: 1,
                data: Array(this.historicalMinutes).fill({
                    value: 72,
                    timestamp: new Date()
                }) // fill with default value
            },
            humidity: {
                minValue: 0,
                maxValue: 100,
                maxDeltaPerInterval: 3,
                data: Array(this.historicalMinutes).fill({
                    value: 50,
                    timestamp: new Date()
                }) // fill with default value
            },
            voc: {
                minValue: 0,
                maxValue: 500,
                maxDeltaPerInterval: 50,
                data: Array(this.historicalMinutes).fill({
                    value: 30,
                    timestamp: new Date()
                }) // fill with default value
            },
            occupancy: {
                minValue: 0,
                maxValue: 30,
                maxDeltaPerInterval: 3,
                data: Array(this.historicalMinutes).fill({
                    value: 0,
                    timestamp: new Date()
                }) // fill with default value
            }
        })
        this.startDataGeneration();
    }

    addEvent(event: DeviceEvent) {
        this.events.unshift(event)
        if (this.events.length > this.maxEvents) {
            this.events.pop()
        }
    }

    // generate data for this device
    // ms: milliseconds since last event
    private dataGenerationTick(ms: number) {

        let newDataTick: RollingEnvironmentalData = this.$environmentalData.value;
        // remove oldest datapoint from arrays
        newDataTick.temperature?.data.shift()
        newDataTick.humidity?.data.shift()
        newDataTick.voc?.data.shift()
        newDataTick.occupancy?.data.shift()

        // add new value to end of arrays
        newDataTick.temperature?.data.push({
            value: this.getTemperatureValue(),
            timestamp: new Date()
        })
        newDataTick.humidity?.data.push({
            value: this.getHumidityValue(),
            timestamp: new Date()
        })
        newDataTick.voc?.data.push({
            value: this.getVocValue(),
            timestamp: new Date()
        })
        newDataTick.occupancy?.data.push({
            value: this.getOccupancyValue(),
            timestamp: new Date()
        })

        if (this.events && this.events.length > 0) {
            const secondsSinceLastEvent = differenceInSeconds(
                new Date(),
                this.events[this.events.length - 1].timestamp
            )
            if (secondsSinceLastEvent > this.maxEventSecondsTilClear) {
                // remove oldest event
                this.events.pop()
            }
        }

        this.$environmentalData.next(newDataTick)
    }

    private getTemperatureValue() {
        let currentSeconds = new Date().getSeconds()
        let modifier = ((currentSeconds % 20) * .01)
        modifier = Math.random() > 0.5 ? modifier * -1 : modifier
        if (this.location.currentAirQualityIssueSources?.includes('temp-high')) {
            return 78 + modifier
        } else if (this.location.currentAirQualityIssueSources?.includes('temp-low')) {
            return 65 + modifier
        } else {
            return 72 + modifier
        }
    }

    private getHumidityValue() {
        let currentSeconds = new Date().getSeconds()
        let modifier = ((currentSeconds % 20) * .01)
        modifier = Math.random() > 0.5 ? modifier * -1 : modifier
        if (this.location.currentAirQualityIssueSources?.includes('humidity-high')) {
            return 75 + modifier
        } else if (this.location.currentAirQualityIssueSources?.includes('temp-low')) {
            return 21 + modifier
        } else {
            return 48 + modifier
        }
    }

    private getVocValue() {
        let currentSeconds = new Date().getSeconds()
        let modifier = ((currentSeconds % 20) * 1)
        modifier = Math.random() > 0.5 ? modifier * -1 : modifier
        if (this.location.currentAirQualityIssueSources?.includes('voc-high')) {
            return 210 + modifier
        } else {
            return 33 + modifier
        }
    }

    private getOccupancyValue() {
        if (this.location.currentAirQualityIssueSources?.includes('occupancy-high')) {
            return 18
        } else if (this.location.currentAirQualityIssueSources?.includes('occupancy-low')) {
            return 5
        }
        return 0
    }

    private getRealisticPseudorandomNumber(currentValue: number, maxMovement: number, overallMin: number, overallMax: number): number {
        let max: number = currentValue + maxMovement
        let min: number = currentValue - maxMovement
        if (max > overallMax) {
            max = overallMax
        }
        if (min < overallMin) {
            min = overallMin
        }
        currentValue = Math.round((Math.random() * (max - min) + min) * 100) / 100
        return currentValue
    }

    startDataGeneration() {
        const time_interval_ms = 1000;
        this.dataGenerationInterval = setInterval(() => {
            this.dataGenerationTick(time_interval_ms);
        }, time_interval_ms);
    }

    endDataGeneration() {
        clearInterval(this.dataGenerationInterval);
    }
}