import { Routes } from '@angular/router';
import { numericIdGuard } from './guards/numeric-id.guard';
import { leavePageGuard } from './guards/leave-page.guard';

export const propertiesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./properties-page/properties-page')
        .then(m => m.PropertiesPageComponent)
  },
  {
    path: 'add',
    canDeactivate: [leavePageGuard],
    loadComponent: () =>
      import('./property-form/property-form')
        .then(m => m.PropertyFormComponent)
  },
  {
    path: ':id',
    canActivate: [numericIdGuard],
    loadComponent: () =>
      import('./property-detail/property-detail')
        .then(m => m.PropertyDetailComponent)
  }
];
