// src/app/shared/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface User {
  id: number | string;
  name: string;
  email: string;
  // add other fields as your API returns
}

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  // e.g., http://worksy.local:8080/api   (ensure no trailing slash in env)
  private readonly baseUrl = environment.Urls.apiBase.replace(/\/+$/, '');

  private readonly LS_TOKEN = 'auth.token';
  private readonly LS_USER  = 'auth.user';

  /** In-memory copies */
  private token: string | null = localStorage.getItem(this.LS_TOKEN);
  private userSubject = new BehaviorSubject<User | null>(this.safeReadUser());
  /** Subscribe to user changes if needed */
  readonly user$ = this.userSubject.asObservable();

  constructor() {
    // Expose for quick console debugging (optional)
    (window as any).authService = this;
  }

  // -------------------- Lifecycle helper --------------------

  /**
   * Call once at app start (e.g., in AppComponent) to restore session:
   * if a token exists, it attempts /me. On failure, it clears auth.
   *
   * Example:
   *   this.auth.init().subscribe();
   */
  init(): Observable<User | null> {
    if (!this.token) return of(null);
    return this.fetchMe().pipe(
      catchError(() => {
        this.reset();
        return of(null);
      })
    );
  }

  // -------------------- Public API (Bearer token flow) --------------------

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/register`,
      { name, email, password },
      { headers: this.jsonHeaders() }
    ).pipe(tap(res => this.saveAuth(res)));
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/login`,
      { email, password },
      { headers: this.jsonHeaders() }
    ).pipe(tap(res => this.saveAuth(res)));
  }

  /** Refresh/return current user from server and cache it */
  fetchMe(): Observable<User> {
    return this.http.get<User>(
      `${this.baseUrl}/me`,
      { headers: this.authHeaders() }
    ).pipe(tap(u => this.saveUser(u)));
  }

  /** Cached value (may be null) */
  me(): User | null {
    return this.userSubject.value;
  }

  logout(): Observable<unknown> {
    return this.http.post(
      `${this.baseUrl}/logout`, {},
      { headers: this.authHeaders() }
    ).pipe(tap(() => this.reset()));
  }

  /** Optional protected text endpoint example */
  secret(): Observable<string> {
    return this.http.get(
      `${this.baseUrl}/secret`,
      { headers: this.authHeaders({ Accept: 'text/plain' }), responseType: 'text' }
    ).pipe(map(txt => txt as unknown as string));
  }

  /** Clear token + user locally (no network) */
  reset(): void {
    this.token = null;
    localStorage.removeItem(this.LS_TOKEN);
    this.saveUser(null);
  }

  /** True if a token is present */
  isAuthed(): boolean { return !!this.token; }

  /** Returns current token or null */
  getToken(): string | null { return this.token; }

  /** Convenience accessor for current user (cached) */
  getCurrentUser(): User | null { return this.userSubject.value; }

  // -------------------- Internal helpers --------------------

  private jsonHeaders(extra: Record<string, string> = {}): HttpHeaders {
    return new HttpHeaders({ Accept: 'application/json', 'Content-Type': 'application/json', ...extra });
  }

  private authHeaders(extra: Record<string, string> = {}): HttpHeaders {
    const base = this.jsonHeaders(extra);
    return this.token ? base.set('Authorization', `Bearer ${this.token}`) : base;
  }

  private saveAuth(res: Partial<AuthResponse>): void {
    if (res.token) {
      this.token = res.token;
      localStorage.setItem(this.LS_TOKEN, res.token);
    }
    if (res.user) this.saveUser(res.user);
  }

  private saveUser(u: User | null): void {
    if (u) {
      localStorage.setItem(this.LS_USER, JSON.stringify(u));
      this.userSubject.next(u);
    } else {
      localStorage.removeItem(this.LS_USER);
      this.userSubject.next(null);
    }
  }

  private safeReadUser(): User | null {
    try {
      const raw = localStorage.getItem(this.LS_USER);
      return raw ? JSON.parse(raw) as User : null;
    } catch {
      return null;
    }
  }
}
