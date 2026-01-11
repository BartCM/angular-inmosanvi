import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PropertiesResponse } from '../models/responses/properties-response';
import { SinglePropertyResponse } from '../models/responses/single-property-response';
import { PropertyInsert } from '../models/property-insert';
import { Property } from '../models/property';

@Injectable({ providedIn: 'root' })
export class PropertiesService {

  private http = inject(HttpClient);

  private readonly propertiesUrl = '/properties';

  /** Resource principal */
  propertiesResource = httpResource<PropertiesResponse>(() => ({
    url: this.propertiesUrl
  }));

  /** INSERT */
  addProperty(property: PropertyInsert): Observable<Property> {
    return this.http
      .post<SinglePropertyResponse>(this.propertiesUrl, property)
      .pipe(
        map(resp => resp.property),
        tap(() => this.propertiesResource.reload())
      );
  }

  /** DELETE */
  deleteProperty(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.propertiesUrl}/${id}`)
      .pipe(
        tap(() => this.propertiesResource.reload())
      );
  }
}


