import { Component, OnInit } from '@angular/core';
import { FormComponentBase } from '../../../shared/components/form-component-base';
import { ModalService } from '../../../shared/services/modal.service';
import { AuthorizationService } from '../../../shared/authorization/authorization.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResetPassword } from '../../models/reset-password.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent extends FormComponentBase implements OnInit {

  public resetPasswordForm: FormGroup

  constructor(private authorization: AuthorizationService,
    private router: Router,
    protected modal: ModalService) {
    super(modal);
   }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      requiredPassword: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      token: new FormControl('', [Validators.required])
    });
  }

  public requestPasswordReset(resetPasswordFormValue: any) {
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
