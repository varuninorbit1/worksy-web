import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class TokenService {
  private _token$ = new BehaviorSubject<string | null>(null);
  token$ = this._token$.asObservable();
  get token() { return this._token$.value; }
  setToken(t: string | null) { this._token$.next(t); }
}
