import { Routes } from '@angular/router';
import { authGuard } from '../guard/auth.guard';
export const WORKER_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard,
    //  WorkerGuard
    ],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/worker-dashboard.component')
            .then(m => m.WorkerDashboardComponent)
      },
      {
        path: 'jobs/:id',
        loadComponent: () =>
          import('./job-details/worker-job-details.component')
            .then(m => m.WorkerJobDetailsComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
