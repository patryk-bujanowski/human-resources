import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: '', component: UserProfileComponent },
  { path: 'edit', component: UserEditComponent },
  { path: 'dashboard', component: UserDashboardComponent }
];

@NgModule({
  declarations: [
    UserProfileComponent, 
    UserEditComponent, 
    UserAvatarComponent, 
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserModule { }
