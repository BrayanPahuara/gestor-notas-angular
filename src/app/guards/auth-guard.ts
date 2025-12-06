import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { map, take } from 'rxjs/operators';
export const authGuard: CanActivateFn = (route, state) => {
  //Inyectar servicios necesarios
  const auth = inject(AuthService);
  const router = inject(Router);
  //Verificar estado de autenticación
  return auth.estadoAuth$.pipe(
    take(1),
    map(user => {
      //Permitir acceso si el usuario está autenticado
      if (user) {
        return true;
      } else {
        //Redirigir al login si no está autenticado
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
