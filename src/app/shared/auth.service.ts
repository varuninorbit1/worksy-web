// src/app/shared/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserApi } from './user-api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  //window = inject(Window);
  api = new UserApi(environment.api_base); // e.g., http://localhost:8000/api
   constructor() {
    // Expose this service instance globally for debugging
    (window as any)['auth'] = this;
  }

  get isAuthed() { return !!this.api.token; }
  login(email: string, password: string) {
    return this.api.login(email, password);
  }
  register(name: string, email: string, password: string) {
    return this.api.register(name, email, password);
  }

  // me() { return this.api.me(); }

  logout() { return this.api.logout(); }

  secret() { return this.api.secret(); }
}
