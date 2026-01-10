src/app/notifications/
├── pages/
│   └── notification-list/
│       ├── notification-list.component.ts
│       ├── notification-list.component.html
│       └── notification-list.component.css
│
├── components/
│   └── notification-item/
│       ├── notification-item.component.ts
│       ├── notification-item.component.html
│
├── services/
│   └── notifications.service.ts
│
├── interfaces/
│   └── notification.interface.ts
│
└── notifications.routes.ts

Todo

WorkSy – Notifications UI Integration Roadmap

Introduce a dedicated notifications/ feature module at the app root, parallel to existing worker/ and auth/ modules.

Implement a notification list page to display job-state driven alerts (acceptance, payment readiness, start, end, feedback).

Integrate notification routing via notifications.routes.ts and register it in app.routes.ts.

Extend the layout sidebar to show an unread notification badge without owning notification logic.

Create a notification service to fetch, mark-as-read, and count notifications from the backend.

Ensure notifications are generated only by backend job-state transitions, not frontend actions.

Enable contextual navigation from each notification to job details, chat, payment, or feedback screens.

Restrict notification visibility to job participants and enforce read-only behavior after archival.

Keep the UI state-driven and role-aware, avoiding global state management at this stage.
