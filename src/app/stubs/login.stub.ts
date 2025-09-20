// src/app/auth/login.component.ts
import { Component, DestroyRef, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { easyDebug } from '../../decorator/easy-debug.decorator';

@easyDebug()
@Component({
  selector: 'app-login-stub',
  standalone: true,
  templateUrl: 'login.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class LoginStubComponent {
  // UI state
  submitted = false;
  loading = signal(false);
  error = signal<string | null>(null);

  // DI (Angular 16+ inject() style works great in components too)
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  // Strongly-typed, non-nullable form
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  // No async/await here — Observables all the way
  onSubmit(): void {
    this.submitted = true;
    this.error.set(null);

    if (this.form.invalid) return;

    const { email, password } = this.form.getRawValue();

    this.loading.set(true);

    this.auth
      .login(email, password)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: () => {
          // saveAuth() already ran inside AuthService via tap(...)
          this.router.navigateByUrl('/'); // or '/dashboard'
        },
        error: (err) => {
          // Show a friendly message
          const msg =
            err?.error?.message ||
            err?.message ||
            'Login failed. Please check your credentials.';
          this.error.set(msg);
          console.error('[Login] error:', err);
        },
      });
  }
}
