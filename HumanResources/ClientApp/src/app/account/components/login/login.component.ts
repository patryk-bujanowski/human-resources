import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/shared/authorization/authorization.service';
import { FormComponentBase } from '../../../shared/components/form-component-base';
import { UserAuthentication } from '../../../shared/models/user-authentication.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends FormComponentBase implements OnInit {

  public loginForm: FormGroup;

  constructor(private authorization: AuthorizationService,
    private router: Router, 
    private location: Location) {
    super();
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  public loginUser(loginFormValue: any): void {
    const user: UserAuthentication = {
      email: loginFormValue.email,
      password: loginFormValue.password
    };

    this.authorization.login(user)
      .subscribe(result => {
        this.authorization.currentUser = result;
        localStorage.setItem(this.authorization.accessTokenKey, result.accessToken);
        this.router.navigate(['/']);
      });
  }

  public redirectBack(): void {
    this.location.back();
  }

}
