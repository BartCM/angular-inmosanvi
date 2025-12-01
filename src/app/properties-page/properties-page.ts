import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Property } from '../models/property';

@Component({
  selector: 'properties-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './properties-page.html',
  styleUrl: './properties-page.css',
})
export class PropertiesPageComponent {

  /** Necesario para zoneless Angular */
  #cdr = inject(ChangeDetectorRef);

  properties: Property[] = [];

  newProperty: Property = {
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

  /** Para limpiar el input file (ngModel requiere un valor) */
  filename: string = '';

  /** ID incremental para cada propiedad añadida */
  private nextId = 1;

  /**
   * Lee el archivo de imagen seleccionado y lo convierte a Base64.
   * Guardamos el resultado en newProperty.mainPhoto.
   */
  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      this.newProperty.mainPhoto = '';
      return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.newProperty.mainPhoto = reader.result as string;
      this.#cdr.markForCheck(); // necesario en Angular zoneless
    };
  }

  /**
   * Acción al enviar el formulario.
   * - Clona la propiedad
   * - Le asigna un ID
   * - La añade al array
   * - Resetea formulario + imagen
   */
  onSubmit(form: any) {

    const propertyToAdd: Property = {
      ...this.newProperty,
      id: this.nextId++
    };

    this.properties.push(propertyToAdd);

    // Reset
    this.newProperty = {
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

  /**
   * Elimina una propiedad según su ID
   */
  deleteProperty(id?: number) {
    if (id == null) return;
    this.properties = this.properties.filter(p => p.id !== id);
    this.#cdr.markForCheck();
  }
}
