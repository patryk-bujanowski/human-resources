import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogEntryComponent } from './components/blog-entry/blog-entry.component';
import { BlogEntryListComponent } from './components/blog-entry-list/blog-entry-list.component';



@NgModule({
  declarations: [
    BlogEntryComponent, 
    BlogEntryListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BlogModule { }
