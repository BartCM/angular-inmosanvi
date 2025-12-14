import { Component, EventEmitter, Output, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Property } from '../models/property';

@Component({
  selector: 'property-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './property-form.html',
  styleUrl: './property-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyFormComponent {

  @Output() added = new EventEmitter<Property>();

  /** Modelo del formulario */
  newProperty: Property = {
    id: undefined,
    province: '',
    town: '',
    address: '',
    title: '',
    price: 0,
    sqmeters: 0,
    numRooms: 0,
    numBaths: 0,
    mainPhoto: ''
  };

  /** Para limpiar el input file */
  filename: string = '';

  #cdr = inject(ChangeDetectorRef);

  /** Convierte la imagen a Base64 */
  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      this.newProperty.mainPhoto = '';
      this.#cdr.markForCheck();
      return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.newProperty.mainPhoto = reader.result as string;
      this.#cdr.markForCheck();
    };
  }

  /** Envía la propiedad al padre y resetea el formulario */
  onSubmit(form: any) {
    const property: Property = {
      ...this.newProperty,
      id: Date.now()
    };

    this.added.emit(property);

    // reset
    this.newProperty = {
      id: undefined,
      province: '',
      town: '',
      address: '',
      title: '',
      price: 0,
      sqmeters: 0,
      numRooms: 0,
      numBaths: 0,
      mainPhoto: ''
    };

    this.filename = '';
    form.resetForm();
    this.#cdr.markForCheck();
  }
}


