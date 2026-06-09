import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './auth/login/login.component';
import { PasswordresetComponent } from './auth/passwordreset/passwordreset.component';
import { NewpasswordComponent } from './auth/newpassword/newpassword.component';
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';


const routes: Routes = [

  { path: '',pathMatch: 'full',redirectTo: 'login'},
  { path: 'login', component: LoginComponent },
  { path: 'password-reset', component: PasswordresetComponent },
  { path: 'change-password', component: NewpasswordComponent }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { useHash: true }),
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
