import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if(authService.isAutorized) return true;

  console.log("Auth guard -> Autorization False!")
  const router = inject(Router);
  router.navigate(['/register']);
  return false;
};
