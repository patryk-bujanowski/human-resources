import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {

  @Input()
  public title = 'Błąd!';

  @Input()
  public message: string;

  @Input()
  public buttonText = 'OK';

  constructor(private modal: ModalService) { }

  ngOnInit(): void {
  }

  public close(result?: any): void {
    this.modal.close(result);
  }

  public dismiss(reason?: any): void {
    this.modal.dismiss(reason);
  }

}
