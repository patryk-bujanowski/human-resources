import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserAuthentication } from '../../user/models/user-authentication.model';
import { environment } from '../../../environments/environment.prod';
import { User } from '../../user/models/user.model';
import { Observable, pipe, Subscription } from 'rxjs';
import { UserRegistration } from 'src/app/user/models/user-registration.model';
import { ForgotPassword } from '../../account/models/forgot-password.model';
import { ResetPassword } from '../../account/models/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public readonly accessTokenKey = 'access_token';
  public readonly currentUserKey = 'current_user';

  constructor(private http: HttpClient,
    public router: Router) { }

  public register(user: UserRegistration): Observable<User> {
    const url = environment.apiUrl + '/api/account/register';
    return this.http.post<User>(url, user);
  }

  public login(user: UserAuthentication): Observable<User> {
    const url = environment.apiUrl + '/api/account/login';
    return this.http.post<User>(url, user);
  }

  public logout(): void {
    localStorage.removeItem(this.accessTokenKey);
  }

  public forgotPassword(model: ForgotPassword): Observable<string> {
    const url = environment.apiUrl + '/api/account/forgot-password';
    return this.http.post<string>(url, model);
  }

  public resetPassword(model: ResetPassword): Observable<string> {
    const url = environment.apiUrl + '/api/account/reset-password';
    return this.http.post<string>(url, model);
  }

  public get token(): string {
    return localStorage.getItem(this.accessTokenKey);
  }

  public get currentUser(): User {
    const user = localStorage.getItem(this.currentUserKey);
    if (user !== null) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  public get isLoggedIn(): boolean {
    return localStorage.getItem(this.accessTokenKey) !== null && this.currentUser !== null;
  }
}
