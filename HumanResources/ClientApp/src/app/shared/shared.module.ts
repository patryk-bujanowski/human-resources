import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryService } from './services/repository.service';
import { ValidationService } from './services/validation.service';
import { AuthorizationService } from './authorization/authorization.service';
import { ModalService } from './services/modal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent } from './components/message-modal/message-modal.component';

@NgModule({
  declarations: [
    MessageModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    MessageModalComponent
  ],
  providers: [
    RepositoryService,
    ValidationService,
    AuthorizationService,
    ModalService
  ]
})
export class SharedModule { }
