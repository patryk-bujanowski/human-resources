import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogEntryComponent } from './components/blog-entry/blog-entry.component';
import { BlogEntryListComponent } from './components/blog-entry-list/blog-entry-list.component';
import { BlogEntryCreateComponent } from './components/blog-entry-create/blog-entry-create.component';
import { BlogRepositoryService } from './services/blog-repository.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BlogEntryComponent,
    BlogEntryListComponent,
    BlogEntryCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    BlogEntryComponent,
    BlogEntryListComponent,
    BlogEntryCreateComponent,
    SharedModule
  ],
  providers: [
    BlogRepositoryService
  ]
})
export class BlogModule { }
