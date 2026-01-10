import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authMatchGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'worker',
    loadChildren: () =>
      import('./worker/worker.routes')
        .then(m => m.WORKER_ROUTES),
  },

  {
  path: 'customer',
  loadChildren: () =>
    import('./customer/customer.routes')
      .then(m => m.CUSTOMER_ROUTES)
},


  // Auth
  { path: 'login', loadComponent: () => import('./stubs/login.stub').then(m => m.LoginStubComponent) },
  { path: 'signup', loadComponent: () => import('./auth/signup.component').then(m => m.SignupComponent) },

  // Categories & search
  { path: 'categories', loadComponent: () => import('./stubs/categories.stub').then(m => m.CategoriesStubComponent) },
  {
    path: 'c/:slug',
    canActivate: [authMatchGuard],
    loadComponent: () => import('./stubs/job-choice/job-choice.component').then(m => m.JobChoiceComponent)
  },
  { path: 'search', loadComponent: () => import('./stubs/search.stub').then(m => m.SearchStubComponent) },

  // ✅ JobChoice cascading dropdown demo
  { path: 'job-choice', loadComponent: () => import('./stubs/job-choice/job-choice.component').then(m => m.JobChoiceComponent) },

  // ✅ Profile page
  // {
  //   path: 'profile',
  //   canActivate: [authMatchGuard], // restrict only to logged-in users
  //   loadComponent: () => import('./stubs/user-profile/user-profile.component').then(m => m.UserProfileComponent)
  // },

  // Wildcard → redirect to home (optional)

  {
    path: 'notifications',
    loadChildren: () =>
      import('./notifications/notifications.routes'),
  }
  ,

  { path: '**', redirectTo: '' }
];
