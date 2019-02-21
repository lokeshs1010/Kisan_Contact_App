import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { MessageSentListComponent } from './message-sent-list/message-sent-list.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { NewMessageComponent } from './new-message/new-message.component';
import { CreateContactComponent } from './create-contact/create-contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/contact-list', pathMatch: 'full' },
  { path: 'contact-list', component: ContactListComponent},
  { path: 'create-contact', component: CreateContactComponent},
  { path: 'message-sent-list', component: MessageSentListComponent},
  { path: 'contact-info/:id', component: ContactInfoComponent},
  { path: 'new-message/:id', component: NewMessageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
