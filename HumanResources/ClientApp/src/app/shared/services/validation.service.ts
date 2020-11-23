import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  public matchPassword(password: string, confirmPassword: string): any {
    return (form: FormGroup) => {
      const passwordControl = form.controls[password];
      const confirmPasswordControl = form.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({
          passwordMismatch: true
        });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }
}
