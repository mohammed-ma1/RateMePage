import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor() { }

  getCurrentPosition(): Observable<{ lat: number, lng: number }> {
    return new Observable(observer => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            observer.complete();
          },
          (error) => observer.error(error)
        );
      } else {
        observer.error('Geolocation not supported');
      }
    });
  }
}
