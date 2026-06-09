import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListaComponent } from './lista/lista.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DetallecitaComponent } from './detallecita/detallecita.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { PagarComponent } from './pagos/pagar/pagar.component';
import { MisPagosComponent } from './pagos/mis-pagos/mis-pagos.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { LegalComponent } from './legal/legal.component';
import { LoginComponent } from '../auth/login/login.component';
import { PresupuestosComponent } from './presupuestos/presupuestos.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';

//pages


const childRoutes: Routes = [

  { path: 'home', component: HomeComponent, data: { title: 'app' } },
  { path: 'home', redirectTo: 'home', pathMatch: 'full' },
  


  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'lista', component: ListaComponent
  },
  {
    path: 'perfil', component: PerfilComponent
  },
  {
    path: 'perfil-doctor/:id', component: DoctorProfileComponent
  },
  {
    path: 'detalle-cita/:id', component: DetallecitaComponent
  },
  {
    path: 'pagar/:id', component: PagarComponent
  },
  {
    path: 'mis-pagos', component: MisPagosComponent
  },
  {
    path: 'mis-presupuestos', component: PresupuestosComponent
  },
  {
    path: 'mis-notificaciones', component: NotificacionesComponent
  },
  {
    path: 'ayuda', component: AyudaComponent
  },
  {
    path: 'legal', component: LegalComponent
  },
  
  { path: '**', component: HomeComponent },
  

]

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoute),
    RouterModule.forChild(childRoutes),
  ],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
