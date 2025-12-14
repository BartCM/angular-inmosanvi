import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Property } from '../models/property';
import { IntlCurrencyPipe } from '../pipes/intl-currency.pipe';


@Component({
  selector: 'property-card',
  standalone: true,
  imports: [CommonModule, IntlCurrencyPipe],
  templateUrl: './property-card.html',
  styleUrl: './property-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyCardComponent {

  /** Recibe una propiedad desde el componente padre */
  private _property = signal<Property | null>(null);

  @Input() set property(value: Property | null) {
    this._property.set(value);
  }

  /** Getter para usar en el template */
  get property() {
    return this._property();
  }


  @Output() deleted = new EventEmitter<number>();

  /** Emitimos el ID al padre */
  delete() {
    if (this.property?.id != null) {
      this.deleted.emit(this.property.id);
    }
  }
}
