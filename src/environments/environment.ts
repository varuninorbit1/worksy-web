export const environment = {
  production: false,
  Urls: {
    apiBase: 'http://worksy.local:8080/api',
    relativeURL: '/conact/',   // change to 'api/authi/' when needed
    everyQuery: '',
  }
  // keep empty; we use header auth now

};
export type Urls = typeof environment.Urls;
