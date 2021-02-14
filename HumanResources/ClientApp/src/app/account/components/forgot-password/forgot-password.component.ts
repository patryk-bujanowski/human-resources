import { Component, OnInit } from '@angular/core';
import { FormComponentBase } from '../../../shared/components/form-component-base';
import { AuthorizationService } from '../../../shared/authorization/authorization.service';
import { Router } from '@angular/router';
import { ModalService } from '../../../shared/services/modal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ForgotPassword } from '../../models/forgot-password.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent extends FormComponentBase implements OnInit {

  public forgotPasswordForm: FormGroup;

  constructor(private authorization: AuthorizationService,
    private router: Router,
    protected modal: ModalService) {
      super(modal);
     }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  public requestPasswordReset(forgotPasswordFormValue: any): void {
    const forgotPassword: ForgotPassword = {
      email: forgotPasswordFormValue.email
    };

    this.authorization.forgotPassword(forgotPassword)
      .subscribe(() => {
          this.showMessage('Wiadomość email wysłana', 'Proszę sprawdzić swoją skrynkę email, na którą została wysłana wiadomość z kodem resetującym hasło.')
            .then(() => this.router.navigate(['/account/reset-password'], { queryParams: { email: forgotPasswordFormValue.email } }));
        }, error => {
        this.handleError(error.message);
      });
    }
}
