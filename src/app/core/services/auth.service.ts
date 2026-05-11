import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import {
  LoginRequest, LoginResponse,
  RegisterRequest, RegisterResponse,
  GetUserResponse,
  UpdateUserRequest, UpdateUserResponse
} from '../models/auth.model';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'gm_token';
  private readonly EMAIL_KEY = 'gm_email';
  private readonly ROLE_KEY  = 'gm_role';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const email = localStorage.getItem(this.EMAIL_KEY);
    if (email && this.getToken()) {
      this.setPartialUser(email);
      this.fetchUser(email).subscribe({ error: () => {} });
    }
  }

  login(req: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, req).pipe(
      tap(res => {
        if (res.status === 'success') {
          localStorage.setItem(this.TOKEN_KEY, res.token);
          localStorage.setItem(this.EMAIL_KEY, res.email);
          localStorage.setItem(this.ROLE_KEY,  res.role);
          // Set user immediately so navbar updates without waiting for fetchUser
          this.setPartialUser(res.email);
          // Fetch full profile (name, address etc.) in background
          this.fetchUser(res.email).subscribe({ error: () => {} });
        }
      })
    );
  }

  private setPartialUser(email: string): void {
    this.currentUserSubject.next({
      id: '', name: email.split('@')[0], email,
      phone: '', addressLine: '', city: '', state: '', pincode: ''
    });
  }

  register(req: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${environment.apiUrl}/user_management_service/register`, req
    );
  }

  fetchUser(email: string): Observable<GetUserResponse> {
    const params = new HttpParams().set('email', email);
    return this.http.get<GetUserResponse>(
      `${environment.apiUrl}/user_management_service/get_user_details`, { params }
    ).pipe(
      tap(res => {
        if (res.status === 'success') {
          // API returns the user object nested under "id" key
          this.currentUserSubject.next(res.id);
        }
      })
    );
  }

  updateUser(req: UpdateUserRequest): Observable<UpdateUserResponse> {
    return this.http.patch<UpdateUserResponse>(
      `${environment.apiUrl}/user_management_service/update_user_details`, req
    ).pipe(
      tap(res => {
        if (res.status === 'success') {
          const email = this.getCurrentUserEmail();
          if (email) this.fetchUser(email).subscribe();
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EMAIL_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUserEmail(): string | null {
    return localStorage.getItem(this.EMAIL_KEY);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
