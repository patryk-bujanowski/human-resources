import { FormGroup } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { ViewChild, TemplateRef, Component } from '@angular/core';

@Component({
  template: ''
})
export abstract class FormComponentBase {

  public modalTitle: string;  
  public modalMessage: string;

  @ViewChild('messageModal')
  public modalRef: TemplateRef<any>;

  @ViewChild('warningModal')
  public warningModalRef: TemplateRef<any>;

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

  protected showMessage(title: string, message: string): Promise<any> {
    this.modalTitle = title;
    this.modalMessage = message;
    return this.modal.open(this.modalRef, { backdrop: 'static' });
  }

  protected handleError(message: string): Promise<any> {
    return this.showMessage('Błąd!', message);
  }

  protected showWarning(message: string): Promise<any> {
    this.modalTitle = 'Ostrzeżenie';
    this.modalMessage = message;
    return this.modal.open(this.warningModalRef, { backdrop: 'static' });
  }
}
