// src/app/header.component.ts
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
  <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom sticky-top">
    <div class="container">
      <a class="navbar-brand fw-bold" routerLink="/">
        <i class="bi bi-tools me-2"></i>WorkSy
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navMain" aria-controls="navMain"
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navMain">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
          <li class="nav-item"><a class="nav-link" routerLink="/" fragment="how">How it works</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/categories">Categories</a></li>

          <!-- If logged in -->
          <ng-container *ngIf="auth.user$ | async as user; else guest">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button"
                 data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person-circle me-1"></i> {{ user.name }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" routerLink="/profile">Profile</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" (click)="logout()">Logout</a></li>
              </ul>
            </li>
          </ng-container>

          <!-- If not logged in -->
          <ng-template #guest>
            <li class="nav-item">
              <a class="btn btn-primary ms-lg-3" routerLink="/login">
                <i class="bi bi-box-arrow-in-right me-1"></i> Sign in
              </a>
            </li>
          </ng-template>
        </ul>
      </div>
    </div>
  </nav>
  `
})
export class HeaderComponent {
  // 👇 either of these lines fixes the typing:
  protected readonly auth: AuthService = inject(AuthService);
  // or: protected readonly auth = inject<AuthService>(AuthService);

  constructor(private router: Router) {}

  logout() {

    this.auth.logout().subscribe(() => this.router.navigateByUrl('/'));
  }
}
