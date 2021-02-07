import { FormGroup } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { ViewChild, TemplateRef } from '@angular/core';

export abstract class FormComponentBase {

  public modalMessage: string;

  @ViewChild('errorModal')
  public errorModal: TemplateRef<any>;

  constructor(protected modal: ModalService) { }

  public validateControl(form: FormGroup, controlName: string): boolean {
    if (form.controls[controlName].invalid && form.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  public hasError(form: FormGroup, controlName: string, errorName: string): boolean {
    if (form.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  protected handleError(message: string): void {
    this.modalMessage = message;
    this.modal.open(this.errorModal);
  }
}
