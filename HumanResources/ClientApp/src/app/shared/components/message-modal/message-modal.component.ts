import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {

  @Input()
  public title: string;

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

}
