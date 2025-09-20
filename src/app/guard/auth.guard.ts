import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/** Shared check used by both guards */
function check(url: string) {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Fast path: already authed in memory
  if (auth.isAuthed()) return of(true);

  // If a token exists (e.g., from localStorage), try restoring the session
  if (auth.getToken()) {
    return auth.init().pipe(
      map(u => (u || auth.isAuthed()) ? true
        : router.createUrlTree(['/login'], { queryParams: { returnUrl: url } })
      ),
      catchError(() =>
        of(router.createUrlTree(['/login'], { queryParams: { returnUrl: url } }))
      )
    );
  }

  // No token -> bounce to login
  const tree: UrlTree = router.createUrlTree(['/login'], { queryParams: { returnUrl: url } });
  return of(tree);
}

/** Use for canActivate */
export const authGuard: CanActivateFn = (route, state) => check(state.url);

/** Use for canMatch (prevents even loading the chunk if not authed) */
export const authMatchGuard: CanMatchFn = (route, segments) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Safely build the URL from segments
  const url = '/' + (Array.isArray(segments) ? segments.map(s => s.path).join('/') : '');

  return check(url);
};
