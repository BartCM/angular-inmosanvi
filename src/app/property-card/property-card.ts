import {
  Component,
  ChangeDetectionStrategy,
  input,
  output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Property } from '../models/property';

@Component({
  selector: 'property-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-card.html',
  styleUrl: './property-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyCardComponent {

  /** Property recibida (signal) */
  property = input<Property>();

  /** Evento de borrado */
  deleted = output<number>();

  delete() {
    const prop = this.property();
    if (!prop) return;

    this.deleted.emit(prop.id);
  }

}