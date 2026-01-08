import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authTokenInterceptor } from './interceptors/auth-token.interceptor';
import { authUnauthorizedInterceptor } from './interceptors/auth-unauthorized.interceptor';
import { responseMessageInterceptor } from './interceptors/response-message.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        authTokenInterceptor,          // 1️⃣ attach token
        authUnauthorizedInterceptor,   // 2️⃣ handle 401
        responseMessageInterceptor     // 3️⃣ show popup
      ])
    ),
  ]
};
