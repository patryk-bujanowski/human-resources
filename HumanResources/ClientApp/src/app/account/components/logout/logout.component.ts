import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../../shared/authorization/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authorization: AuthorizationService,
    private router: Router) { }

  ngOnInit(): void {
    this.authorization.logout();
    this.router.navigate(['/']);
  }

}
