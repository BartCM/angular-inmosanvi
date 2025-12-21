import {
  Component,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  signal,
  effect,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PropertyInsert } from '../models/property-insert';
import { EncodeBase64Directive } from '../directives/encode-base64.directive';
import { ProvincesService } from '../services/provinces.service';

@Component({
  selector: 'property-form',
  standalone: true,
  imports: [CommonModule, FormsModule, EncodeBase64Directive],
  templateUrl: './property-form.html',
  styleUrl: './property-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyFormComponent {

  private provincesService = inject(ProvincesService);

  /** Signal con la provincia seleccionada */
  provinceId = signal(0);

  /** Provincias (HttpResource) */
  provincesResource = this.provincesService.provincesResource;

  /** Towns dependientes de la provincia */
  townsResource = this.provincesService.getTownsResource(this.provinceId);

  /** Modelo del formulario (sin id) */
  newProperty: PropertyInsert = {
    title: '',
    description: '',
    address: '',
    price: 0,
    sqmeters: 0,
    numRooms: 0,
    numBaths: 0,
    townId: 0,
    mainPhoto: ''
  };

  /** Emitimos al padre */
  @Output() added = new EventEmitter<PropertyInsert>();

  constructor() {
    // Cuando cambia la provincia, resetear townId
    effect(() => {
      this.provinceId();
      this.newProperty.townId = 0;
    });
  }

  /** Recibe Base64 desde la directiva */
  onImageEncoded(base64: string) {
    this.newProperty.mainPhoto = base64;
  }

  /** Envío del formulario */
    onSubmit(form: any) {

    this.added.emit(this.newProperty);

    this.newProperty = {
      title: '',
      description: '',
      address: '',
      price: 0,
      sqmeters: 0,
      numRooms: 0,
      numBaths: 0,
      townId: 0,
      mainPhoto: ''
    };

    this.provinceId.set(0);
    form.resetForm();
  }

}