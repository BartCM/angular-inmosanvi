import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Property } from '../models/property';
import { PropertyFormComponent } from '../property-form/property-form';
import { PropertyCardComponent } from '../property-card/property-card';

@Component({
  selector: 'properties-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,            // Necesario para ngModel en los filtros
    PropertyFormComponent,
    PropertyCardComponent
  ],
  templateUrl: './properties-page.html',
  styleUrl: './properties-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesPageComponent {

  /** Lista de propiedades como SIGNAL */
  properties = signal<Property[]>([]);

  /** Filtros como signals */
  search = signal('');
  filterProvince = signal('');

  /** Lista filtrada */
  filteredProperties = computed(() => {
    const s = this.search().toLowerCase().trim();
    const p = this.filterProvince();
    const props = this.properties();

    return props.filter(pr =>
      (pr.title.toLowerCase().includes(s) || pr.address.toLowerCase().includes(s)) &&
      (p === '' || pr.province === p)
    );
  });

  /** Añadida desde property-form */
  addProperty(prop: Property) {
    this.properties.update(list => [...list, prop]);
  }

  /** Eliminada desde property-card */
  deleteProperty(id: number) {
    this.properties.update(list => list.filter(p => p.id !== id));
  }
}