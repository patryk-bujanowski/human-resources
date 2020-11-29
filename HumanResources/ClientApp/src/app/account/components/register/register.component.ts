import { Component, OnInit } from '@angular/core';
import { FormComponentBase } from 'src/app/shared/components/form-component-base';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../shared/authorization/authorization.service';
import { User } from '../../../shared/models/user.model';
import { UserAuthentication } from '../../../shared/models/user-authentication.model';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends FormComponentBase implements OnInit {

  public registerForm: FormGroup;

  constructor(private authorization: AuthorizationService, 
    private router: Router,
    private location: Location) {
    super();
   }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }

  public registerUser(registerFormValue: any): void {
    const user: UserAuthentication = {
      email: registerFormValue.email,
      password: registerFormValue.password
    };

    this.authorization.register(user)
      .subscribe(result => {
        if (result !== null) {
          this.router.navigate(['/']);
        }
      });
  }

  public redirectBack(): void {
    this.location.back();
  }

}
