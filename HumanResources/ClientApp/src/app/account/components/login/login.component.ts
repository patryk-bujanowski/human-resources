import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/shared/authorization/authorization.service';
import { FormComponentBase } from '../../../shared/components/form-component-base';
import { UserAuthentication } from '../../../user/models/user-authentication.model';
import { Router } from '@angular/router';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormComponentBase implements OnInit {

  public loginForm: FormGroup;

  constructor(private authorization: AuthorizationService,
    private router: Router,
    protected modal: ModalService) {
    super(modal);
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
        localStorage.setItem(this.authorization.currentUserKey, JSON.stringify(result));
        localStorage.setItem(this.authorization.accessTokenKey, result.accessToken);
        this.router.navigate(['/']);
      }, error => {
        this.handleError(error.message);
      });
  }
}
