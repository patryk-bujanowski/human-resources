import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryService } from './services/repository.service';
import { ValidationService } from './services/validation.service';
import { AuthorizationService } from './authorization/authorization.service';
import { ModalService } from './services/modal.service';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ErrorModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    ErrorModalComponent
  ],
  providers: [
    RepositoryService,
    ValidationService,
    AuthorizationService,
    ModalService
  ]
})
export class SharedModule { }
