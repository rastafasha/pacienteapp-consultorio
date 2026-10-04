import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClinicaService } from '../services/clinica.service';

@Injectable()
export class TenantInterceptor implements HttpInterceptor {
  
  private clinicaService = inject(ClinicaService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // 🛡️ ESCUDO EXPANDIDO: Rutas globales que pertenecen a la PWA Universal del paciente
    const rutasGlobales = [
      'loginpaciente', 
      'login',
      '/user/show/ndoc/',      // Endpoint maestro de datos e historial unificado
      '/presupuesto/bypatient/' // Endpoint maestro de presupuestos consolidados
    ];

    // Si la petición apunta a cualquier ruta del grupo global, pasa virgen sin header multi-tenant
    const esRutaGlobal = rutasGlobales.some(ruta => request.url.includes(ruta));

    if (esRutaGlobal) {
        console.log(`🛡️ [TenantInterceptor Pacientes]: Bypass aplicado para ruta global unificada: ${request.url}`);
        return next.handle(request);
    }

    // Flujos secundarios o legacy que aún requieran contexto de tenant (retornará 'consultorio')
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
