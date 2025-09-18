import { Injectable } from '@angular/core';
// If LZString.js is plain JS, this import works if "allowJs": true in tsconfig
// and the path is correct. Alternatively, create a tiny TS wrapper file.
import { e, d } from './LZstring.js';  // e = compressToEncodedURIComponent, d = decompressFromEncodedURIComponent

type AnyRecord = Record<string, unknown>;

@Injectable({ providedIn: 'root' })
export class StoreService {
  /**
   * Create a Proxy that transparently encrypts object values on set
   * and decrypts+JSON.parses them on get.
   *
   * @param storeName - namespace prefix applied to every key
   * @param targetObj - any plain object you want to wrap
   */
  createStore<T extends AnyRecord>(storeName: string, targetObj: T): T {
    const rename = (name: PropertyKey) => `${storeName}$${String(name)}`;
    const isJson = (s: string): boolean => {
      try { JSON.parse(s); return true; } catch { return false; }
    };

    const handler: ProxyHandler<T> = {
      get(target, prop, receiver) {
        const key = rename(prop);
        if (!Reflect.has(target as AnyRecord, key)) return undefined;

        const raw = Reflect.get(target as AnyRecord, key, receiver);

        if (typeof raw === 'string') {
          // try decrypt → JSON.parse
          try {
            const dec = d(raw);
            if (dec !== null && isJson(dec)) return JSON.parse(dec);
          } catch {
            // fallthrough to return raw below
            console.warn(`StoreService: failed to decrypt/parse key ${String(prop)}`);
          }
        }
        return Reflect.get(target as AnyRecord, key, receiver);
      },

      set(target, prop, value, receiver) {
        const key = rename(prop);

        let toStore: unknown = value;

        // Only encrypt objects/arrays (and Dates via JSON)
        if (value !== null && typeof value === 'object') {
          // avoid circular refs for a key named __this
          const json = JSON.stringify(value, (k, v) => (k === '__this' ? null : v));
          toStore = e(json);
        }

        return Reflect.set(target as AnyRecord, key, toStore, receiver);
      },

      // make "in" operator align with renamed keys
      has(target, prop) {
        return Reflect.has(target as AnyRecord, rename(prop));
      },

      // optional: expose real keys when enumerating
      ownKeys(target) {
        return Reflect.ownKeys(target).map((k) =>
          String(k).startsWith(`${storeName}$`) ? String(k).slice(storeName.length + 1) : k
        );
      },

      // ensure property descriptors match the remapped keys
      getOwnPropertyDescriptor(target, prop) {
        const key = rename(prop);
        return Object.getOwnPropertyDescriptor(target, key);
      },
    };

    return new Proxy<T>(targetObj, handler);
  }
}
