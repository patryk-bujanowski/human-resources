import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthorizationService } from '../shared/authorization/authorization.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent implements OnInit {

  public get userProfile(): Observable<string> {
    return of(this.authorization.currentUser.firstName + ' ' + this.authorization.currentUser.lastName);
  }

  public get avatar(): string {
    return `data:image/png;base64,${this.authorization.currentUser.avatar}`;
  }

  public get isAuthenticated(): Observable<boolean> {
    return of(this.authorization.isLoggedIn);
  }

  constructor(private authorization: AuthorizationService) { }

  ngOnInit(): void {
    
  }
}
