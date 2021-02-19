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

  private readonly emptyValue = '[brak]';

  public get firstName(): string {
    return this.user.firstName ? this.user.firstName : this.emptyValue;
  }

  public get lastName(): string {
    return this.user.lastName ? this.user.lastName : this.emptyValue;
  }

  public get birthdate(): string {
    return this.user.birthdate ? this.user.birthdate.toString() : this.emptyValue;
  }

  public get city(): string {
    return this.user.city ? this.user.city : this.emptyValue;
  }

  public get email(): string {
    return this.user.email;
  }

  public get phoneNumber(): string {
    return this.user.phoneNumber ? this.user.phoneNumber : this.emptyValue;
  }

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
