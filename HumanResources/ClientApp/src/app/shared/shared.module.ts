import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryService } from './services/repository.service';
import { ValidationService } from './services/validation.service';
import { AuthorizationService } from './authorization/authorization.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    RepositoryService,
    ValidationService,
    AuthorizationService
  ]
})
export class SharedModule { }
