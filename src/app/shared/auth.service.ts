// src/app/shared/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserApi } from './user-api';
import { AuthResponse } from './interface/auth-response.interface';
import { easyDebug } from '../../decorator/easy-debug.decorator';

@Injectable({ providedIn: 'root' })
export class AuthService {
  //window = inject(Window);
  authResponse: any
  api = new UserApi(environment.Urls.apiBase); // e.g., http://localhost:8000/api
   constructor() {
    // Expose this service instance globally for debugging
    (window as any).authService = this;
  }

  get isAuthed() { return !!this.api.token; }
  login(email: string, password: string) {
    return this.authResponse = this.api.login(email, password);
  }
  register(name: string, email: string, password: string) {
    return this.api.register(name, email, password);
  }

  me() { return this.authResponse}

  logout() { return this.api.logout(); }

  secret() { return this.api.secret(); }
  reset() { return this.api.reset(); }
  getToken() { return this.api.token; }
}
// angular 20  auth service
// rewrite the above code.
// it should use httpclient to make requests
// it should store the user and token in localstorage
// it should have a method to get the current user me()
// it should have a method to check if the user is logged in isAuthed()
// it should have a method to log out the user logout()
// it should have a method to register a new user register()
// it should have a method to log in the user login()
// it should have a method to reset the user and token reset()
// it should have a method to get the auth token getToken()
//
