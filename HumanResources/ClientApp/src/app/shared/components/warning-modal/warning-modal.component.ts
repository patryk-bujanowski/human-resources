import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.css']
})
export class WarningModalComponent implements OnInit {

  @Input()
  public title: string = 'Ostrzeżenie';

  @Input()
  public message: string;

  @Input()
  public buttonAcceptText = 'Tak';

  public buttonCancelText = 'Nie';

  constructor(private modal: ModalService) { }

  ngOnInit(): void {
  }

  public close(result?: any): void {
    this.modal.close(result);
  }

}
