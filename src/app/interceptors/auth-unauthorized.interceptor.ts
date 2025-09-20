import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authUnauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        console.warn('[AuthInterceptor] 401 Unauthorized -> clearing session');
        auth.reset();
        // optional: force redirect to login
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
