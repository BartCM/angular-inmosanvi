import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const numericIdGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (id && !isNaN(Number(id))) {
    return true;
  }

  router.navigate(['/properties']);
  return false;
};
