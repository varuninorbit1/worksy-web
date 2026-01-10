import { Routes } from '@angular/router';
import { CustomerJobDetailsComponent } from './jobs/job-details/customer-job-details.component';

export const CUSTOMER_ROUTES: Routes = [
  {
    path: 'jobs/:jobId',
    component: CustomerJobDetailsComponent,
    title: 'Job Details'
  }
];
