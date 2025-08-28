import { AuthResponse } from "./interface/auth-response.interface";

export class UserApi {
  baseUrl: string;
  token: string | null;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('auth_token'); // load if present
  }

    // helper to build headers
  _headers(extra: Record<string, string> = {}): Record<string, string> {
    const headers: Record<string, string> = {
      "Accept": "application/json",
      ...extra,
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    return headers;
  }
  _saveToken(t: string) {
    this.token = t;
    t ? localStorage.setItem('auth_token', t) : localStorage.removeItem('auth_token');
  }
  async register(name:string, email:string, password:string) { /* ... */ }

  async login(email:string, password:string): Promise<AuthResponse> {
    const res = await fetch(`${this.baseUrl}/login`, {
      method: "POST",
      headers: this._headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) this._saveToken(data.token);
    return data;
  }

  async logout() {
    const res = await fetch(`${this.baseUrl}/logout`, {
      method: "POST",
      headers: this._headers(),
    });
    const data = await res.json();
    this.token = null; // clear local token
    return data;
  }

  async secret() {
    const res = await fetch(`${this.baseUrl}/secret`, {
      headers: this._headers({ "Accept": "text/plain" })
    });
    return res.text();
  }
}
