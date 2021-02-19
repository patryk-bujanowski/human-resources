import { Component, OnInit, enableProdMode } from '@angular/core';
import { FormComponentBase } from '../../../shared/components/form-component-base';
import { ModalService } from '../../../shared/services/modal.service';
import { AuthorizationService } from '../../../shared/authorization/authorization.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ResetPassword } from '../../models/reset-password.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent extends FormComponentBase implements OnInit {

  public resetPasswordForm: FormGroup;

  public resetPassword: ResetPassword;

  constructor(private authorization: AuthorizationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    protected modal: ModalService) {
    super(modal);
   }

  ngOnInit(): void {
    this.resetPassword = {
      email: this.activatedRoute.snapshot.queryParams.email,
      password: null,
      token: this.activatedRoute.snapshot.queryParams.token
    };

    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: [this.resetPassword.email, Validators.required, Validators.email],
      token: [this.resetPassword.token, Validators.required]
    });
  }

  public requestPasswordReset(resetPasswordFormValue: any): void {
    const resetPassword: ResetPassword = {
      password: resetPasswordFormValue.password,
      email: resetPasswordFormValue.email,
      token: resetPasswordFormValue.token
    };

    this.authorization.resetPassword(resetPassword)
      .subscribe(result => {
        if (result !== null) {
          this.showMessage('Udało się!', 'Hasło zmienione prawidłowo.')
            .then(() => this.router.navigate(['/account/login']));
        }
      }, error => {
        this.handleError(error.message);
      })
  }

}
