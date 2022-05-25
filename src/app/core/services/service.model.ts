import { isThisSecond } from 'date-fns';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { EnvironmentData, EnvironmentService } from './environment/environment.service';
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
    },
    total?: {
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

    private maxTotal;

    useOverrideValues: boolean = false;
    private environmentDataOverrideValues: {
        temperature: number,
        humidity: number,
        voc: number,
        occupancy: number
    }

    private $environmentalData: BehaviorSubject<RollingEnvironmentalData> = new BehaviorSubject(null);
    public readonly environmentalData: Observable<RollingEnvironmentalData> = this.$environmentalData.asObservable();

    constructor(initializer: Partial<Device> = {}) {
        Object.assign(this, initializer);

        this.environmentDataOverrideValues = {
            temperature: 72,
            humidity: 50,
            voc: 30,
            occupancy: 0
        }

        this.$environmentalData.next({
            temperature: {
                minValue: 60,
                maxValue: 90,
                maxDeltaPerInterval: 1,
                data: Array(this.historicalMinutes).fill({
                    value: this.environmentDataOverrideValues.temperature,
                    timestamp: new Date()
                }) // fill with default value
            },
            humidity: {
                minValue: 0,
                maxValue: 100,
                maxDeltaPerInterval: 3,
                data: Array(this.historicalMinutes).fill({
                    value: this.environmentDataOverrideValues.humidity,
                    timestamp: new Date()
                }) // fill with default value
            },
            voc: {
                minValue: 0,
                maxValue: 500,
                maxDeltaPerInterval: 50,
                data: Array(this.historicalMinutes).fill({
                    value: this.environmentDataOverrideValues.voc,
                    timestamp: new Date()
                }) // fill with default value
            },
            occupancy: {
                minValue: 0,
                maxValue: 30,
                maxDeltaPerInterval: 3,
                data: Array(this.historicalMinutes).fill({
                    value: this.environmentDataOverrideValues.occupancy,
                    timestamp: new Date()
                }) // fill with default value
            },
            total: {
                minValue: 0,
                maxValue: 100,
                maxDeltaPerInterval: 1,
                data: Array(this.historicalMinutes).fill({
                    value: 0,
                    timestamp: new Date()
                })
            },
        })
        this.maxTotal = 
            this.$environmentalData.value.temperature?.maxValue +
            this.$environmentalData.value.humidity?.maxValue +
            this.$environmentalData.value.voc?.maxValue +
            this.$environmentalData.value.occupancy?.maxValue;
        
        this.startDataGeneration()
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
        newDataTick.total?.data.shift()

        // add new value to end of arrays
        if (this.useOverrideValues) {
            newDataTick.temperature.data.push({
                value: this.environmentDataOverrideValues.temperature,
                timestamp: new Date()
            })
            newDataTick.humidity.data.push({
                value: this.environmentDataOverrideValues.humidity,
                timestamp: new Date()
            })
            newDataTick.voc.data.push({
                value: this.environmentDataOverrideValues.voc,
                timestamp: new Date()
            })
            newDataTick.occupancy.data.push({
                value: this.environmentDataOverrideValues.occupancy,
                timestamp: new Date()
            })
        } else {
            newDataTick.temperature?.data.push({
                value: this.getRealisticPseudorandomNumber(
                    newDataTick.temperature?.data[newDataTick.temperature?.data.length - 1]?.value, // first object in array
                    newDataTick.temperature?.maxDeltaPerInterval,
                    newDataTick.temperature?.minValue,
                    newDataTick.temperature?.maxValue
                ),
                timestamp: new Date()
            })
            newDataTick.humidity?.data.push({
                value: this.getRealisticPseudorandomNumber(
                    newDataTick.humidity?.data[newDataTick.humidity?.data.length - 1]?.value, // first object in array
                    newDataTick.humidity?.maxDeltaPerInterval,
                    newDataTick.humidity?.minValue,
                    newDataTick.humidity?.maxValue
                ),
                timestamp: new Date()
            })
            newDataTick.voc?.data.push({
                value: this.getRealisticPseudorandomNumber(
                    newDataTick.voc?.data[newDataTick.voc?.data.length - 1]?.value, // first object in array
                    newDataTick.voc?.maxDeltaPerInterval,
                    newDataTick.voc?.minValue,
                    newDataTick.voc?.maxValue
                ),
                timestamp: new Date()
            })
            newDataTick.occupancy?.data.push({
                value: Math.round(this.getRealisticPseudorandomNumber(
                    newDataTick.occupancy?.data[newDataTick.occupancy?.data.length - 1]?.value, // first object in array
                    newDataTick.occupancy?.maxDeltaPerInterval,
                    newDataTick.occupancy?.minValue,
                    newDataTick.occupancy?.maxValue
                )),
                timestamp: new Date()
            })

            // set most recent datapoint as current override data
            // to prevent jarring change when going into manual mode in the future
            this.setEnvironmentalOverrideData({
                temperature: newDataTick.temperature.data[this.historicalMinutes - 1].value,
                humidity: newDataTick.humidity.data[this.historicalMinutes - 1].value,
                voc: newDataTick.voc.data[this.historicalMinutes - 1].value,
                occupancy: newDataTick.occupancy.data[this.historicalMinutes - 1].value
            })
        }        
        newDataTick.total?.data.push({
            value: this.calculateTotalAq(),
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

    setEnvironmentalOverrideData(data: { temperature?: number, humidity?: number, voc?: number, occupancy?: number }) {
        if (data.temperature) {
            this.environmentDataOverrideValues.temperature = data.temperature
        }
        if (data.humidity) {
            this.environmentDataOverrideValues.humidity = data.humidity
        }
        if (data.voc) {
            this.environmentDataOverrideValues.voc = data.voc
        }
        if (data.occupancy) {
            this.environmentDataOverrideValues.occupancy = data.occupancy
        }
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

    // "Total AQ" is just the % that current sum of the 4 measurands is of total possible
    private calculateTotalAq(): number {
        const i = this.historicalMinutes - 1

        const environmentalDataTotal = 
            this.$environmentalData.value.temperature?.data[i].value +
            this.$environmentalData.value.humidity?.data[i].value +
            this.$environmentalData.value.voc?.data[i].value +
            this.$environmentalData.value.occupancy?.data[i].value

        return Math.round((environmentalDataTotal / this.maxTotal) * 100)
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