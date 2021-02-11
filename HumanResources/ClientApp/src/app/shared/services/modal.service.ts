import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalRef: NgbModalRef;

  constructor(private modal: NgbModal) { }

  public open(content: any, options?: NgbModalOptions): Promise<any> {
    this.modalRef = this.modal.open(content, options);
    return this.modalRef.result;
  }

  public close(result?: any): void {
    this.modalRef.close(result);
  }

}
