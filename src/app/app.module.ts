import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TenantInterceptor } from './interceptors/tenant.interceptor';

@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule,
        AppRoutingModule,
        SharedModule,
        // PagesModule,
        FormsModule,
        AuthModule,
        RouterModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerImmediately'
        }),
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 4000,
            positionClass: 'toast-top-center', // 🔥 Clase nativa correcta (Arriba a la derecha)
            preventDuplicates: true,
            closeButton: true,               // Le añade la equis para cerrar
            progressBar: true
        })],
    providers: [
        // 1. Interceptor de Autenticación Existente (Inyecta el Token Bearer)
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },

        // 🔒 2. REGISTRO MULTI-TENANT GLOBAL (Inyecta el subdominio de la clínica actual)
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TenantInterceptor,
            multi: true // Permite la coexistencia en la cascada HTTP de Angular
        },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
