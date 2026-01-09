# WorkSy Web – Directory Structure

This document captures the current canonical directory structure of the **WorkSy Web (Angular)** application, including the newly introduced **Worker feature module**.

_Last updated: 09 Jan 2026_

---

## Root Structure

```text
worksy-web/
└── src/
    └── app/

src/app
├── auth/
│   ├── login/
│   ├── register/
│   └── auth.routes.ts
│
├── core/
│   └── services/
│
├── guard/
│   └── auth.guard.ts
│
├── home/
│   └── home.component.ts
│
├── interceptors/
│
├── layout/
│   ├── header/
│   ├── footer/
│   └── layout.component.ts
│
├── services/
│   ├── action2.service.ts
│   ├── job-hierarchy-service.ts
│   ├── lzstring.js
│   ├── state.service.ts
│   ├── store.service.ts
│   ├── token.service.ts
│   └── tree.service.ts
│
├── shared/
│   ├── interface/
│   └── auth.service.ts
│
├── stubs/
│   ├── job-choice/
│   ├── job-details/
│   ├── profile/
│   └── logout/
│
├── worker/
│   ├── dashboard/
│   │   ├── worker-dashboard.component.ts
│   │   ├── worker-dashboard.component.html
│   │   └── worker-dashboard.component.css
│   │
│   ├── job-details/
│   │   ├── worker-job-details.component.ts
│   │   ├── worker-job-details.component.html
│   │   └── worker-job-details.component.css
│   │
│   ├── guards/
│   │   └── worker.guard.ts
│   │
│   ├── services/
│   │   └── worker-jobs.service.ts
│   │
│   └── worker.routes.ts
│
├── app.config.ts
├── app.css
├── app.html
├── app.routes.ts
├── app.spec.ts
└── app.ts
