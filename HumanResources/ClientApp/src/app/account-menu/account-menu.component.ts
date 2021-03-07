import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthorizationService } from '../shared/authorization/authorization.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {

  public get userProfile(): Observable<string> {
    const firstName = this.authorization.currentUser.firstName;
    const lastName = this.authorization.currentUser.lastName;

    if (firstName && lastName) {
      return of(this.authorization.currentUser.firstName + ' ' + this.authorization.currentUser.lastName);
    } else {
      return of(this.authorization.currentUser.email);
    }
  }

  public get isAuthenticated(): Observable<boolean> {
    return of(this.authorization.isLoggedIn);
  }

  constructor(private authorization: AuthorizationService) { }

  ngOnInit(): void {
    
  }
}
