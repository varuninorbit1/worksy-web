import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
{ path: '', component: HomeComponent },
// Stubs for navigation targets used on the page (optional):
{ path: 'find', loadComponent: () => import('./stubs/find.component').then(m => m.FindComponent) },
{ path: 'post-job', loadComponent: () => import('./stubs/post-job.component').then(m => m.PostJobComponent) },
{ path: 'login', loadComponent: () => import('./stubs/login.component').then(m => m.LoginComponent) },
{ path: 'signup', loadComponent: () => import('./stubs/signup.component').then(m => m.SignupComponent) },
{ path: 'worker/:id', loadComponent: () => import('./stubs/worker.component').then(m => m.WorkerComponent) },
{ path: 'book/:id', loadComponent: () => import('./stubs/book.component').then(m => m.BookComponent) },
];