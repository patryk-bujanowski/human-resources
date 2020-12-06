import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/shared/authorization/authorization.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public userEditForm: FormGroup;

  public get userProfile(): User {
    return this.authorization.currentUser;
  }

  constructor(private authorization: AuthorizationService) { }

  ngOnInit(): void {
    this.userEditForm = new FormGroup({
      firstName: new FormControl(this.userProfile.firstName, [Validators.required]),
      lastName: new FormControl(this.userProfile.lastName, [Validators.required]),
      birthdate: new FormControl(this.userProfile.birthdate, [Validators.required]),
      city: new FormControl(this.userProfile.city, [Validators.required]),
      phoneNumber: new FormControl(this.userProfile.phoneNumber, [Validators.required])
    });
  }

  public editUser(userEditFormValue: any): void {

  }

}
