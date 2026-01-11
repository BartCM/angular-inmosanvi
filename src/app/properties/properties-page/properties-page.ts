import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PropertyCardComponent } from '../property-card/property-card';
import { PropertiesService } from '../../services/properties.service';
import { Property } from '../../models/property';
import { ProvincesService } from '../../services/provinces.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'properties-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PropertyCardComponent
  ],
  templateUrl: './properties-page.html',
  styleUrl: './properties-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesPageComponent {

  private propertiesService = inject(PropertiesService);
  private provincesService = inject(ProvincesService);
  private title = inject(Title);

  provincesResource = this.provincesService.provincesResource;

  /** Filtros */
  search = signal('');
  filterProvince = signal('');

  /** Resource del backend */
  properties = computed(() => 
    this.propertiesService.propertiesResource.value()?.properties ?? []);

  /** Lista filtrada */
  filteredProperties = computed(() => {
    const s = this.search().toLowerCase().trim();
    const p = this.filterProvince();
    const props = this.properties();

    return props.filter((pr: Property) =>
      (pr.title.toLowerCase().includes(s) ||
       pr.description.toLowerCase().includes(s)) &&
      (p === '' || pr.town.province.name.toLocaleLowerCase() === p)
    );
  });

  constructor() {
    this.title.setTitle('Properties page');
  }

  deleteProperty(id: number) {
    this.propertiesService.deleteProperty(id).subscribe();
  }
}
