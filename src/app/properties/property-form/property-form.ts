import {
  Component,
  ChangeDetectionStrategy,
  signal,
  effect,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { PropertyInsert } from '../../models/property-insert';
import { EncodeBase64Directive } from '../../directives/encode-base64.directive';
import { ProvincesService } from '../../services/provinces.service';
import { PropertiesService } from '../../services/properties.service';
import { Title } from '@angular/platform-browser';

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
  private router = inject(Router);
  private title = inject(Title);


  /** Provincia seleccionada */
  provinceId = signal(0);

  /** Indica si ya se ha creado la propiedad (CanDeactivate) */
  created = signal(false);

  /** Recursos */
  provincesResource = this.provincesService.provincesResource;
  townsResource = this.provincesService.getTownsResource(this.provinceId);

  /** Modelo */
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
    this.title.setTitle('New property');
    effect(() => {
      this.provinceId();
      this.newProperty.townId = 0;
    });
  }

  onImageEncoded(base64: string) {
    this.newProperty.mainPhoto = base64;
  }

  /** Inserción REAL */
  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.propertiesService
      .addProperty(this.newProperty)
      .subscribe(property => {
        //Marcamos como creada
        this.created.set(true);

        //Redirigimos al detalle
        this.router.navigate(['/properties', property.id]);
      });
  }
}