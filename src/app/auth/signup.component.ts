import { Component, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormGroup
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { easyDebug } from '../../decorator/easy-debug.decorator';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const pw = group.get('password')?.value;
  const cpw = group.get('confirmPassword')?.value;
  return pw && cpw && pw !== cpw ? { passwordsMismatch: true } : null;
}

@easyDebug()
@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class SignupComponent {
  submitted = false;
  loading = signal(false);
  error = signal<string | null>(null);

  // Declare first, init in constructor (so DI is ready)
  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required]],
        },
        { validators: [passwordsMatch] }
      )
    });
    debugger
  }

  get f() { return this.form.controls; }
  get passwordGroup(): FormGroup { return this.form.get('passwordGroup') as FormGroup; }
  get passwordCtrl() { return this.passwordGroup.get('password'); }
  get confirmPasswordCtrl() { return this.passwordGroup.get('confirmPassword'); }

  async onSubmit() {
    this.submitted = true;
    this.error.set(null);
    if (this.form.invalid) return;

    const name = this.f['name'].value!;
    const email = this.f['email'].value!;
    const password = this.passwordCtrl?.value!;

    this.loading.set(true);
    try {
      const res: any = await this.auth.register(name, email, password);
      if (res?.token || res?.user) {
        this.router.navigateByUrl('/');
      } else {
        this.error.set(res?.message || 'Sign up failed. Please try again.');
      }
    } catch (e: any) {
      this.error.set(e?.message || 'Sign up failed. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}
