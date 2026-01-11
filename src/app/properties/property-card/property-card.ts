import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Property } from '../../models/property';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'property-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './property-card.html',
  styleUrl: './property-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'property-card bg-white rounded-lg shadow-md relative flex flex-col'
  }
})
export class PropertyCardComponent {
  // REQUIRED así no te obliga a poner "?" y eliminas muchos errores de template
  property = input.required<Property>();

  deleted = output<number>();

  delete() {
    this.deleted.emit(this.property().id);
  }
}