import { Injectable } from '@angular/core';
import { Device, FullLocation } from '../service.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  deviceMocks: Record<string, Device> = {};
  // public isManualMode: boolean = false;
  // public environmentData: EnvironmentData;
  // unsubscribe$: Subject<boolean> = new Subject();

  constructor() {
  }

  public generateDeviceMock(id: string, name: string, deviceLocation: FullLocation) {
    if (this.deviceMocks[id]) {
      return this.deviceMocks[id];
    }
    const {events}: Pick<Device, 'events'> = { events: []};
    this.deviceMocks[id] = new Device({
      id: id,
      type: 'AIR20',
      location: deviceLocation,
      // random date some time in the last year
      installationDate: new Date(new Date().getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      name,
      events,
    });
    if (Math.random() > 0.5) {
      events.push({
        part: 'Lamp',
        action: 'Removed',
        timestamp: new Date(2021, 11, 22),
      });
    }
    if (Math.random() > 0.5) {
      events.push({
        part: 'Filter',
        action: 'Detected New',
        timestamp: new Date(2021, 11, 22),
      });
    }
    if (Math.random() > 0.5) {
      events.push({
        part: 'Door',
        action: 'Opened',
        timestamp: new Date(2021, 11, 22),
      });
    }
    if (Math.random() > 0.5) {
      events.push({
        part: 'Filter',
        action: 'Removed',
        timestamp: new Date(2021, 11, 31),
      });
    }

    return this.deviceMocks[id];
  }

  getDevice(id: string) {
    return this.deviceMocks[id];
  }

  getDevicesInLocation(locationId: string) {
    return Object.values(this.deviceMocks)
            .filter(device =>
              device.location.id === locationId ||
              device.location.fullLocationPath.some(location => location.id === locationId));
  }
}
