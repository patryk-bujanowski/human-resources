import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthorizationService } from '../shared/authorization/authorization.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent implements OnInit {

  public get isAuthenticated(): Observable<boolean> {
    return of(this.authorization.isLoggedIn);
  }

  constructor(private authorization: AuthorizationService) { }

  ngOnInit(): void {
    
  }
}
