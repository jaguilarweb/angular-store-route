import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

//Este servicio habilita la precarga personalizada de módulos según una condición.

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadService implements PreloadingStrategy {

  constructor() { }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    //Todas las rutas que tengan la bandera preload se van a precargar
    if (route.data && route.data['preload']) {
      return load();
    }
    //Los que no la tengan no se precargan
    return of(null)
  }
}
