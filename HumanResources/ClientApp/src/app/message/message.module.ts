import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from './components/message-list/message-list.component';
import { Routes, RouterModule } from '@angular/router';
import { MessageSendComponent } from './components/message-send/message-send.component';
import { MessageViewComponent } from './components/message-view/message-view.component';

const routes: Routes = [
  { path: 'list', component: MessageListComponent },
  { path: 'send', component: MessageSendComponent },
  { path: 'view', component: MessageViewComponent }
];

@NgModule({
  declarations: [
    MessageListComponent, 
    MessageSendComponent, 
    MessageViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MessageModule { }
