import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridHomeComponent } from './grid-home/grid-home.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { PublicidadComponent } from './publicidad/publicidad.component';
import { CitasComponent } from './citas/citas.component';
import { SignosvitalesComponent } from './signosvitales/signosvitales.component';
import { SharedModule } from '../shared/shared.module';
import { ModalInstruccionesComponent } from './modal-instrucciones/modal-instrucciones.component';



@NgModule({ declarations: [
        GridHomeComponent,
        CategoriasComponent,
        PublicidadComponent,
        CitasComponent,
        SignosvitalesComponent,
        ModalInstruccionesComponent
    ],
    exports: [
        GridHomeComponent,
        CategoriasComponent,
        PublicidadComponent,
        CitasComponent,
        SignosvitalesComponent,
        ModalInstruccionesComponent
    ], imports: [CommonModule,
        RouterModule,
        SharedModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class ComponentsModule { }
