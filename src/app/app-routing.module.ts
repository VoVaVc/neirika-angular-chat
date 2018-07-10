import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatBarComponent } from './pages/chat-bar/chat-bar.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'main', component: ChatBarComponent },
  { path: 'main/:id', component: ChatBarComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
