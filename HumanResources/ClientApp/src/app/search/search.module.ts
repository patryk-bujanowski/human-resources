import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'results/:query', component: SearchResultsComponent }
];
@NgModule({
  declarations: [
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SearchModule { }
