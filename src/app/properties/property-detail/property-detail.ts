import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { PropertiesService } from '../../services/properties.service';
import { PropertyCardComponent } from '../property-card/property-card';
import { Title } from '@angular/platform-browser';
import { effect } from '@angular/core';

@Component({
  selector: 'property-detail',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent],
  templateUrl: './property-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyDetailComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private propertiesService = inject(PropertiesService);
  private title = inject(Title);

  /** ID como signal */
  propertyId = signal(
    Number(this.route.snapshot.paramMap.get('id'))
  );

  /** Resource de UNA propiedad */
  propertyResource =
    this.propertiesService.getPropertyResource(this.propertyId);

      constructor() {
      effect(() => {
        const property = this.propertyResource.value()?.property;
        if (property) {
          this.title.setTitle(property.title);
        }
      });
    }

  /** Borrado + redirect */
  onDelete(id: number) {
    this.propertiesService.deleteProperty(id).subscribe(() => {
      this.router.navigate(['/properties']);
    });
  }
}