import { Component, OnInit } from '@angular/core';
import { FormComponentBase } from 'src/app/shared/components/form-component-base';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../shared/authorization/authorization.service';
import { Router } from '@angular/router';
import { UserRegistration } from 'src/app/user/models/user-registration.model';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends FormComponentBase implements OnInit {

  public registerForm: FormGroup;

  constructor(private authorization: AuthorizationService, 
    private router: Router,
    protected modal: ModalService) {
    super(modal);
   }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  public registerUser(registerFormValue: any): void {
    const user: UserRegistration = {
      email: registerFormValue.email,
      password: registerFormValue.password
    };

    this.authorization.register(user)
      .subscribe(result => {
        if (result !== null) {
          this.showMessage('Udało się!', 'Użytkownik został zarejestrowany prawidłowo.'
            + 'Teraz nastąpi przekierowanie do strony logowania.')
            .then(() => this.router.navigate(['/']));
        }
      }, error => {
        this.handleError(error.message);
      });
  }
}
