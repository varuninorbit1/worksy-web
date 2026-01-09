import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { of } from 'rxjs';

export const workerGuard: CanActivateFn = (): true | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);

  //logic to be added here to check for worker role
  // For now, just allow access
  return true;

  // Logged in but wrong role → redirect safely
  //return router.createUrlTree(['/home']);
};
