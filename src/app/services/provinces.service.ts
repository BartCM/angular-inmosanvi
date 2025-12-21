import { Injectable, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Province } from '../models/province';
import { Town } from '../models/town';

@Injectable({ providedIn: 'root' })
export class ProvincesService {

  /** Provincias */
  provincesResource = httpResource<{ provinces: Province[] }>(() => ({
    url: '/provinces'
  }));

  /** Towns por provincia */
  getTownsResource(provinceId: () => number) {
    return httpResource<{ towns: Town[] }>(() => {
      const id = provinceId();
      if (!id) {
        return undefined;
      }
      return {
        url: `/provinces/${id}/towns`
      };
    });
  }
}

