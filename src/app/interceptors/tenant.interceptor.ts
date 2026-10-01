import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClinicaService } from '../services/clinica.service';

@Injectable()
export class TenantInterceptor implements HttpInterceptor {
  
  private clinicaService = inject(ClinicaService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // 🛡️ EL ESCUDO DEFINITIVO: Si la ruta va al login del paciente, no inyectamos nada
    if (request.url.includes('loginpaciente') || request.url.includes('login')) {
        return next.handle(request);
    }

    const tenantSlug = this.clinicaService.obtenerSlugDeUrl();

    console.log(`✈️ [TenantInterceptor Pacientes]: Inyectando header Multi-Tenant para el slug: ${tenantSlug}`);

    const requestConTenant = request.clone({
      setHeaders: {
        'X-Tenant-Slug': tenantSlug
      }
    });

    return next.handle(requestConTenant);
  }
}
