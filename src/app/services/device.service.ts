import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private deviceIdKey = 'device-id';

  constructor() {
    this.getDeviceId();
  }

  getDeviceId(): string {
    let deviceId = localStorage.getItem(this.deviceIdKey);
    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem(this.deviceIdKey, deviceId);
    }
    return deviceId;
  }
}
