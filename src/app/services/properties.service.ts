import { Injectable, Signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpResource } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

import { PropertiesResponse } from '../models/responses/properties-response';
import { SinglePropertyResponse } from '../models/responses/single-property-response';
import { PropertyInsert } from '../models/property-insert';
import { Property } from '../models/property';

@Injectable({ providedIn: 'root' })
export class PropertiesService {
  #http = inject(HttpClient);

  propertiesResource = httpResource<PropertiesResponse>(() => ({
    url: '/properties',
  }));

  addProperty(property: PropertyInsert): Observable<Property> {
    return this.#http.post<SinglePropertyResponse>('/properties', property).pipe(
      map(resp => resp.property),
      tap(() => this.propertiesResource.reload()),
    );
  }

  deleteProperty(id: number): Observable<void> {
    return this.#http.delete<void>(`/properties/${id}`).pipe(
      tap(() => this.propertiesResource.reload()),
    );
  }

  // IMPORTANTE: devuelve la respuesta DEL BACKEND (SinglePropertyResponse)
  getPropertyResource(id: Signal<number>) {
    return httpResource<{ property: Property }>(() => {
      const value = id();
      if (!value) return undefined;

      return {
        url: `/properties/${value}`
      };
    });
  }
}