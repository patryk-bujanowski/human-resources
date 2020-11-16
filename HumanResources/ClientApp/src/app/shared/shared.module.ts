import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryService } from './services/repository.service';
import { ValidationService } from './services/validation.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    RepositoryService,
    ValidationService
  ]
})
export class SharedModule { }
