import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserAuthentication } from '../models/user-authentication.model';
import { environment } from '../../../environments/environment.prod';
import { User } from '../models/user.model';
import { Observable, pipe, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public readonly accessTokenKey = 'access_token';

  public currentUser: User;

  constructor(private http: HttpClient,
    public router: Router) { }

  public register(user: UserAuthentication): Observable<User> {
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

  public get token(): string {
    return localStorage.getItem(this.accessTokenKey);
  }

  public get isLoggedIn(): boolean {
    return localStorage.getItem(this.accessTokenKey) !== null && this.currentUser !== null;
  }
}
