import { FormGroup } from '@angular/forms';

export abstract class FormComponentBase {

  public validateControl = (form: FormGroup, controlName: string) => {
    if (form.controls[controlName].invalid && form.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  public hasError = (form: FormGroup, controlName: string, errorName: string) => {
    if (form.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }
}
