import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClinicaService } from '../services/clinica.service'; // Asegura la ruta correcta

@Injectable()
export class TenantInterceptor implements HttpInterceptor {
  
  private clinicaService = inject(ClinicaService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // 1. Extraemos dinámicamente el subdominio actual (ej: 'clinica-prueba' o 'consultorio-generic')
    const tenantSlug = this.clinicaService.obtenerSlugDeUrl();

    console.log(`✈️ [TenantInterceptor Pacientes]: Inyectando header Multi-Tenant para el slug: ${tenantSlug}`);

    // 2. Clonamos la petición original e inyectamos el Header de Aislamiento
    const requestConTenant = request.clone({
      setHeaders: {
        'X-Tenant-Slug': tenantSlug
      }
    });

    // 3. Despachamos la petición modificada hacia el backend de Laravel en MAMP
    return next.handle(requestConTenant);
  }
}