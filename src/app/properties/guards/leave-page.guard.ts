import { CanDeactivateFn } from '@angular/router';

export interface CanLeavePage {
  canLeave: boolean;
}

export const leavePageGuard: CanDeactivateFn<CanLeavePage> = (component) => {
  if (component.canLeave) {
    return true;
  }

  return confirm('Do you want to leave without saving the property?');
};
