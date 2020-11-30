import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const routes: Routes = [
  { path: '', component: UserProfileComponent },
  { path: 'edit', component: UserEditComponent }
];

@NgModule({
  declarations: [UserProfileComponent, UserEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserModule { }
