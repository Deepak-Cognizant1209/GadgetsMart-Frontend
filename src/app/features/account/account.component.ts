import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { delay } from 'rxjs';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { Order, User } from '../../core/models';

@Component({
  selector: 'app-account',
  imports: [ReactiveFormsModule, CurrencyPipe, DatePipe, MatTabsModule, MatProgressSpinnerModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  orders: Order[] = [];
  profileForm: FormGroup;
  saving = false;
  loadingProfile = true;

  statusColors: Record<string, string> = {
    PENDING: '#ff9800', CONFIRMED: '#00bcd4', SHIPPED: '#9c27b0',
    DELIVERED: '#4caf50', CANCELLED: '#f44336'
  };

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private authService: AuthService,
    private snack: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: [{ value: '', disabled: true }],
      phone: [''],
      addressLine: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
    });
  }

  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe(o => this.orders = o);

    // Immediately fill form from cached user (available right after login)
    const cached = this.authService.currentUser;
    if (cached) {
      this.patchForm(cached);
      this.loadingProfile = false;
    }

    // Fetch fresh full profile from API (overwrites with real DB data)
    const email = this.authService.getCurrentUserEmail();
    if (email) {
      this.authService.fetchUser(email).subscribe({
        next: (res) => {
          this.patchForm(res.id);
          this.loadingProfile = false;
        },
        error: () => { this.loadingProfile = false; }
      });
    } else {
      this.loadingProfile = false;
    }
  }

  private patchForm(u: User): void {
    this.profileForm.patchValue({
      name: u.name,
      email: u.email,
      phone: u.phone ?? '',
      addressLine: u.addressLine ?? '',
      city: u.city ?? '',
      state: u.state ?? '',
      pincode: u.pincode ?? ''
    });
  }

  get userInitials(): string {
    const name = this.profileForm.get('name')?.value as string ?? '';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  saveProfile(): void {
    if (this.profileForm.invalid) { this.profileForm.markAllAsTouched(); return; }
    this.saving = true;
    const v = this.profileForm.getRawValue() as {
      name: string; email: string; phone: string; addressLine: string;
      city: string; state: string; pincode: string;
    };
    this.authService.updateUser({
      name: v.name,
      email: v.email,
      phone: v.phone,
      addressLine: v.addressLine,
      city: v.city,
      state: v.state,
      pincode: v.pincode
    }).pipe(delay(4000)).subscribe({
      next: (res) => {
        this.saving = false;
        this.cdr.detectChanges();
        if (res.status === 'success') {
          this.snack.open('Profile updated successfully!', 'OK', { duration: 3000 });
        } else {
          this.snack.open(res.message ?? 'Failed to update profile.', 'Close', { duration: 4000 });
        }
      },
      error: (err) => {
        this.saving = false;
        this.cdr.detectChanges();
        const msg = err?.error?.message ?? 'Failed to update profile.';
        this.snack.open(msg, 'Close', { duration: 4000 });
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
