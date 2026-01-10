import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../shared/interface/user.interface';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  private auth = inject(AuthService);

  user = signal<User | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {
    this.refresh();
  }

  refresh(): void {
    this.loading.set(true);
    this.error.set(null);

    this.auth.fetchMe() // should return Observable<User>
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (u: User) => {
          this.user.set(u);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('[UserProfile] fetchMe() failed', err);
          this.error.set('Unable to load your profile. Please try again.');
          this.loading.set(false);
        }
      });
  }

  roleBadgeClass(role: User['role_id'] | undefined): string {
    switch (role) {
      case 1: return 'text-bg-danger';
      case 3: return 'text-bg-primary';
      case 2: return 'text-bg-success';
      case 0: return 'text-bg-secondary';
      default: return 'text-bg-light';
    }
  }

  initials(name?: string | null): string {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map(p => p[0]?.toUpperCase() ?? '').join('') || 'U';
  }
}
