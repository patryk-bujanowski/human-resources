import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { BlogModule } from '../blog/blog.module';

const routes: Routes = [
  { path: '', component: UserProfileComponent },
  { path: 'edit', component: UserEditComponent },
  { path: 'dashboard', component: UserDashboardComponent }
];

@NgModule({
  declarations: [
    UserProfileComponent, 
    UserEditComponent, 
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    BlogModule
  ],
  exports: [
    RouterModule
  ]
})
export class UserModule { }
