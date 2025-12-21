import { Injectable, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { PropertiesResponse } from '../models/responses/properties-response';
import { PropertyInsert } from '../models/property-insert';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PropertiesService {

  private http = inject(HttpClient);
  private reload = signal(0);

  propertiesResource = httpResource<PropertiesResponse>(() => {
    this.reload();
    return { url: '/properties' };
  });

  addProperty(property: PropertyInsert) {
    return this.http.post('/properties', property);
  }

  deleteProperty(id: number) {
    return this.http.delete(`/properties/${id}`);
  }

  reloadProperties() {
    this.reload.update(v => v + 1);
  }
}


