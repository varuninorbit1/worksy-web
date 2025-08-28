import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
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
          <li class="nav-item"><a class="btn btn-primary ms-lg-3" routerLink="/login">
            <i class="bi bi-person-circle me-1"></i> Sign in</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  `
})
export class HeaderComponent {}
