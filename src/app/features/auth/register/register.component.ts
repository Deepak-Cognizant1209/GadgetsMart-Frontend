import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

function passwordMatch(control: AbstractControl): { [key: string]: boolean } | null {
  const pw = control.get('password')?.value as string;
  const confirm = control.get('confirmPassword')?.value as string;
  return pw && confirm && pw !== confirm ? { mismatch: true } : null;
}

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule, MatSelectModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;
  hidePassword = true;
  hideConfirm = true;
  loading = false;
  error: string | null = null;
  success = false;
  readonly strengthSegs = [1, 2, 3, 4];

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
      }, { validators: passwordMatch })
    });
  }

  get name() { return this.form.get('name')!; }
  get email() { return this.form.get('email')!; }
  get phone() { return this.form.get('phone')!; }
  get dateOfBirth() { return this.form.get('dateOfBirth')!; }
  get gender() { return this.form.get('gender')!; }
  get password() { return this.form.get('passwords.password')!; }
  get confirmPassword() { return this.form.get('passwords.confirmPassword')!; }
  get passwordsGroup() { return this.form.get('passwords')!; }

  getStrength(): number {
    const pw = (this.password.value as string) ?? '';
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  }

  getStrengthLabel(): string {
    return ['', 'Weak', 'Fair', 'Good', 'Strong'][this.getStrength()] ?? '';
  }

  getStrengthClass(): string {
    return ['', 'weak', 'fair', 'good', 'strong'][this.getStrength()] ?? '';
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.error = null;
    setTimeout(() => {
      this.loading = false;
      this.success = true;
    }, 800);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
