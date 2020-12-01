import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizationService } from 'src/app/shared/authorization/authorization.service';
import { User } from 'src/app/user/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public get user(): User {
    return this.authorization.currentUser;
  }

  public get avatar(): string {
    return `data:image/png;base64,${this.user.avatar}`;
  }

  constructor(private authorization: AuthorizationService) { }

  ngOnInit(): void {
  }

}
