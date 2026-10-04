import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClinicaService } from '../services/clinica.service';
import { environment } from '../../environments/environment'; // 🟢 Importamos los environments

@Injectable()
export class TenantInterceptor implements HttpInterceptor {
  
  private clinicaService = inject(ClinicaService);
  private readonly URL_NODE = environment.backend_node; // 🟢 Tu backend de Node

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // 🛡️ EL ESCUDO DEFINITIVO: Si la ruta va al login del paciente, no inyectamos nada
    if (request.url.includes('loginpaciente') || request.url.includes('login')) {
        return next.handle(request);
    }

    // 🟢 RECTIFICACIÓN: Si la petición NO es para Node (es decir, va para Laravel),
    // dejamos pasar la petición VIRGEN. Laravel en la app de pacientes no usa subdominios.
    const esPeticionNode = request.url.startsWith(this.URL_NODE);
    if (!esPeticionNode) {
        return next.handle(request); 
    }

    // Solo se inyecta para flujos internos de Node si fuera necesario
    const tenantSlug = this.clinicaService.obtenerSlugDeUrl();

    console.log(`✈️ [TenantInterceptor Pacientes]: Inyectando header Multi-Tenant para Node: ${tenantSlug}`);

    const requestConTenant = request.clone({
      setHeaders: {
        'X-Tenant-Slug': tenantSlug
      }
    });

    return next.handle(requestConTenant);
  }
}
