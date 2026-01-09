import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <footer class="py-4 bg-dark text-white-50 mt-auto">
    <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
      <div>© {{ year }} WorkSy</div>
      <ul class="nav">
        <li class="nav-item"><a class="nav-link px-2 text-white-50" routerLink="/about">About</a></li>
        <li class="nav-item"><a class="nav-link px-2 text-white-50" routerLink="/contact">Contact</a></li>
        <li class="nav-item"><a class="nav-link px-2 text-white-50" routerLink="/terms">Terms</a></li>
        <li class="nav-item"><a class="nav-link px-2 text-white-50" routerLink="/privacy">Privacy</a></li>
        <li class="nav-item"><a class="nav-link px-2 text-white-50" routerLink="/worker/dashboard">Go to Worker Dashboard</a></li>
      </ul>
    </div>
  </footer>
  `
})
export class FooterComponent {
  year = new Date().getFullYear();
}
