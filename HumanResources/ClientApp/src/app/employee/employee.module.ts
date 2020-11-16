import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeRepositoryService } from './services/employee-repository.service';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: EmployeeListComponent },
  { path: 'create', component: EmployeeCreateComponent },
];

@NgModule({
  declarations: [
    EmployeeCreateComponent,
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    EmployeeRepositoryService
  ]
})
export class EmployeeModule { }
