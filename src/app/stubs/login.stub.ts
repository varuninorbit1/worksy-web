// src/app/auth/login.component.ts
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
@Component(
  {
    selector: 'app-login-stub',
    standalone: true,
    templateUrl: 'login.component.html',
    imports: [ReactiveFormsModule, CommonModule]
  })
export class LoginStubComponent {
  submitted = false;
  loading = signal(false);
  error = signal<string | null>(null);
  form: any;


  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) {
    }



  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    debugger
    this.submitted = true;
    this.error.set(null);
    if (this.form.invalid) return;

    this.loading.set(true);
    try {
      const { email, password } = this.form.value;
      const res:any = await this.auth.login(email!, password!);
      if (res?.token) {
        // optional: fetch /me or just navigate
        this.router.navigateByUrl('/'); // go to dashboard/home
      } else {
        this.error.set(res?.message || 'Invalid credentials');
      }
    } catch (e: any) {
      this.error.set(e?.message || 'Login failed');
    } finally {
      this.loading.set(false);
    }
  }
}
