import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ListaComponent } from './lista/lista.component';
import { AgendarCitaComponent } from './agendar-cita/agendar-cita.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { PagesRoutingModule } from './pages.routing';
import { PagesComponent } from './pages.component';
import { AddAppointmentsComponent } from './agendar-cita/add-appointments/add-appointments.component';
import { DetallecitaComponent } from './detallecita/detallecita.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { MisPagosComponent } from './pagos/mis-pagos/mis-pagos.component';
import { PagarComponent } from './pagos/pagar/pagar.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { LegalComponent } from './legal/legal.component';


@NgModule({
  declarations: [
    HomeComponent,
    ListaComponent,
    AgendarCitaComponent,
    PerfilComponent,
    PagesComponent,
    AddAppointmentsComponent,
    DetallecitaComponent,
    DoctorProfileComponent,
    MisPagosComponent,
    PagarComponent,
    AyudaComponent,
    LegalComponent
  ],
  exports: [
    HomeComponent,
    ListaComponent,
    AgendarCitaComponent,
    PerfilComponent,
    PagesComponent,
    AddAppointmentsComponent,
    DetallecitaComponent,
    DoctorProfileComponent,
    MisPagosComponent,
    PagarComponent,
    AyudaComponent,
    LegalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    PagesRoutingModule,
    
    
  ],
  
})
export class PagesModule { }
