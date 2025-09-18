import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Hemta {
  headers?: Record<string, string>;
  apiGroup?: string;
  everyQuery?: string;     // optional legacy query tail, e.g. '&lang=en'
  query?: string;
  // additional caller-supplied query string
  version?: string;
  baseURL?: string;
  // default '0'
  // override base
  relativeURL?: string;    // override path prefix
  keyval?: boolean;
  // key-value mode (recommended)
  cache?: string;
}

type KeyVal = Record<string, string | number | boolean | null | undefined>;
@Injectable({ providedIn: 'root' })
export class Action2Service {
  private readonly defaults: Required<Pick<Hemta,
    'apiGroup' | 'everyQuery' | 'version' | 'baseURL' | 'relativeURL' | 'keyval' | 'cache'>> = {
      apiGroup: 'default',
      everyQuery: '',
      version: '0',
      baseURL: environment.Urls.apiBase,
      relativeURL: environment.Urls.relativeURL,
      keyval: false,
      cache: ''
    };
  constructor(private http: HttpClient) { }

  private url(hemta: Hemta) {
    const h = { ...this.defaults, ...hemta };
    return `${h.baseURL}${h.relativeURL}`;
  }

  private resolveVersion(resource: string, hemta: Hemta) {
    // If you keep window['apiVIndex'] map, use it; else fallback to hemta.version
    const idx = (window as any)['apiVIndex'];
    const key = `${hemta.apiGroup || this.defaults.apiGroup}.${resource}`;
    const v = idx?.[key];
    return v ?? hemta.version ?? this.defaults.version;
  }

  private parseQueryString(q?: string): HttpParams {
    if (!q) return new HttpParams();
    // q may start with '&'; split on '&'
    return q.split('&').reduce((hp, frag) => {
      if (!frag) return hp;
      const [k, v] = frag.split('=');
      return k ? hp.set(k, v ?? '') : hp;
    }, new HttpParams());
  }
  /** GET factory — usage:
   *  this.action2.get({ keyval: true })('Users.list')({ page: 1 });
   *  this.action2.get()('Users.list')('id=5', 'active=true');
   */
  get =
    <T = unknown>(hemta: Hemta = {}) =>
      (resource: string) => {
        const [controller, action] = resource.split('.');
        const h = { ...this.defaults, ...hemta };
        const base = `${this.url(h)}${h.apiGroup}/${controller}/${action}`;
        const ver = this.resolveVersion(resource, h);
        const baseParams =
          this.parseQueryString(h.query)
            .append('ver', ver)
            .appendAll(Object.fromEntries(this.parseQueryString(h.everyQuery).keys().map(k => [k,
              this.parseQueryString(h.everyQuery).get(k)!])))
            .appendAll(this.parseQueryString(h.cache).keys().reduce((acc, k) => (acc[k] =
              this.parseQueryString(h.cache).get(k)!, acc), {} as any));
        if (h.keyval) {
          return (kv: KeyVal): Observable<T> => {
            let params = baseParams;
            Object.entries(kv ?? {}).forEach(([k, v]) => {
              if (v === null || v === undefined) return;
              params = params.set(k, String(v));
            });
            return this.http.get<T>(`${base}/keyval`, { params, headers: h.headers });
          };
        } else {
          return (...pieces: string[]): Observable<T> => {
            const extra = new HttpParams({ fromString: pieces.filter(Boolean).join('&') });
            const params = this.mergeParams(baseParams, extra);
            return this.http.get<T>(base, { params, headers: h.headers });
          };
        }
      };

  /** POST factory — usage:
*  this.action2.post({ keyval: true })('Orders.create')({ productId: 7, qty: 2 });
*  this.action2.post()('Orders.create')({ any: 'payload' });
*/
  post =
    <T = unknown>(hemta: Hemta = {}) =>
      (resource: string) => {
        const [controller, action] = resource.split('.');
        const h = { ...this.defaults, ...hemta };
        const base = `${this.url(h)}${h.apiGroup}/${controller}/${action}`;
        const baseParams =
          this.parseQueryString(h.query).appendAll(this.parseQueryString(h.everyQuery).keys()
            .reduce((acc, k) => (acc[k] = this.parseQueryString(h.everyQuery).get(k)!, acc), {} as any));
        if (h.keyval) {
          return (body: KeyVal): Observable<T> =>
            this.http.post<T>(`${base}/keyval`, body ?? {}, {
              params: baseParams, headers:
                h.headers
            });
        } else {
          return (body: any): Observable<T> =>
            this.http.post<T>(base, body ?? {}, { params: baseParams, headers: h.headers });
        }
      };

  private mergeParams(a: HttpParams, b: HttpParams): HttpParams {
    let p = a;
    b.keys().forEach(k => { const v = b.getAll(k)!; v.forEach(val => p = p.append(k, val)); });
    return p;
  }
}
