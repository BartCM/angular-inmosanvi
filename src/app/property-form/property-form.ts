import {
  Component,
  ChangeDetectionStrategy,
  signal,
  effect,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

import { PropertyInsert } from '../models/property-insert';
import { EncodeBase64Directive } from '../directives/encode-base64.directive';
import { ProvincesService } from '../services/provinces.service';
import { PropertiesService } from '../services/properties.service';

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
  private propertiesService = inject(PropertiesService);

  /** Provincia seleccionada */
  provinceId = signal(0);

  /** Recursos */
  provincesResource = this.provincesService.provincesResource;
  townsResource = this.provincesService.getTownsResource(this.provinceId);

  /** Modelo del formulario */
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

  constructor() {
    // Reset del town cuando cambia la provincia
    effect(() => {
      this.provinceId();
      this.newProperty.townId = 0;
    });
  }

  /** Imagen en Base64 */
  onImageEncoded(base64: string) {
    this.newProperty.mainPhoto = base64;
  }

  /** Submit REAL (inserta en backend) */
  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.propertiesService
      .addProperty(this.newProperty)
      .subscribe();

    // Reset del formulario
    form.resetForm();
    this.provinceId.set(0);

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
  }
}