import { Component, OnInit } from '@angular/core';
import { FormComponentBase } from 'src/app/shared/components/form-component-base';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../shared/authorization/authorization.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserRegistration } from 'src/app/user/models/user-registration.model';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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
      confirmPassword: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      sex: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required])
    });
  }

  public registerUser(registerFormValue: any): void {
    const user: UserRegistration = {
      email: registerFormValue.email,
      password: registerFormValue.password,
      firstName: registerFormValue.firstName,
      lastName: registerFormValue.lastName,
      sex: registerFormValue.sex,
      birthdate: registerFormValue.birthdate,
      city: registerFormValue.city,
      phoneNumber: registerFormValue.phoneNumber
    };

    this.authorization.register(user)
      .subscribe(result => {
        if (result !== null) {
          this.showMessage('Udało się!', 'Użytkownik został zarejestrowany prawidłowo.' + '<br>' + 
            'Teraz nastąpi przekierowanie do strony logowania.')
            .then(() => this.router.navigate(['/']));
        }
      }, error => {
        this.handleError(error.message);
      });
  }
}
