import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  // Stubs so navbar/routerLink targets don’t break
  { path: 'login', loadComponent: () => import('./stubs/login.stub').then(m => m.LoginStubComponent) },
  { path: 'signup', loadComponent: () => import('./auth/signup.component').then(m => m.SignupComponent) },
  { path: 'categories', loadComponent: () => import('./stubs/categories.stub').then(m => m.CategoriesStubComponent) },
  { path: 'c/:slug', loadComponent: () => import('./stubs/category.stub').then(m => m.CategoryStubComponent) },
  { path: 'search', loadComponent: () => import('./stubs/search.stub').then(m => m.SearchStubComponent) },
];
