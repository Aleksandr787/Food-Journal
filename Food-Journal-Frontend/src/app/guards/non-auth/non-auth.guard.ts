import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const nonAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if(!authService.isAutorized) return true;

  const router = inject(Router);
  router.navigate(['/main']);
  return false;
};
