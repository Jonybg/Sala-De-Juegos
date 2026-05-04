import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

export const authGuard: CanActivateFn = async  (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)

  const sesionActiva = await authService.haySesion();


  if(!sesionActiva){
    router.navigate(['/auth/login'])
     console.log('sesion activa:', sesionActiva);
    return false;
  }else{
    return true;
  }

  
};
