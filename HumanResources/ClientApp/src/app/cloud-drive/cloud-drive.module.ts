import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudDriveFileUploadComponent } from './components/cloud-drive-file-upload/cloud-drive-file-upload.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'file-upload', component: CloudDriveFileUploadComponent }
]

@NgModule({
  declarations: [CloudDriveFileUploadComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CloudDriveModule { }
