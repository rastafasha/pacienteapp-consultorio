import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { AgendarCitaComponent } from './pages/agendar-cita/agendar-cita.component';
import { HomeComponent } from './pages/home/home.component';
import { ListaComponent } from './pages/lista/lista.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';

// const routes: Routes = [
//   {
//     path:'', component:LoginComponent
//   },
  
//   {
//     path:'home', component:HomeComponent
//   },
//   {
//     path:'lista-especialidades', component:ListaComponent
//   },
//   {
//     path:'agendar-cita', component:AgendarCitaComponent
//   },
//   {
//     path:'perfil', component:PerfilComponent
//   },
// ];

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  // { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: '**', component: PagesComponent },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
