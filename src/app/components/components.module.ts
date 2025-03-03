import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridHomeComponent } from './grid-home/grid-home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { CitasComponent } from './citas/citas.component';
import { SignosvitalesComponent } from './signosvitales/signosvitales.component';
import { Presupuesto } from '../models/presupuesto';
import { PresupuestoDetalleComponent } from './presupuesto-detalle/presupuesto-detalle.component';
import { PresupuestosComponent } from './presupuestos/presupuestos.component';



@NgModule({
  declarations: [
    GridHomeComponent,
    CategoriasComponent,
    PublicidadComponent,
    CitasComponent,
    SignosvitalesComponent,
    PresupuestosComponent,
    PresupuestoDetalleComponent
  ],
  exports: [
    GridHomeComponent,
    CategoriasComponent,
    PublicidadComponent,
    CitasComponent,
    SignosvitalesComponent,
    PresupuestosComponent,
    PresupuestoDetalleComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ]
})
export class ComponentsModule { }
