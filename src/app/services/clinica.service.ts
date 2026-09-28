import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {
  
  private http = inject(HttpClient);
  
  // URL base del CRM de Node.js parametrizada desde tu environment
  private readonly URL_CRM = environment.backend_CRM_node;
  
  // Caché en memoria para no repetir llamadas HTTP en la navegación del paciente
  private clinicaCache$!: Observable<any>;
  private currentSlug: string = '';

  /**
   * 🧽 EXTRAE EL SLUG DEL SUBDOMINIO (*.klyntic.com o *.localhost)
   */
  obtenerSlugDeUrl(): string {
    const host = window.location.hostname.toLowerCase();
    
    // Si estamos en desarrollo local (ej: clinica-prueba.localhost)
    if (!environment.production) {
      const partesLocal = host.split('.');
      return partesLocal.length > 1 ? partesLocal[0] : 'klyntic-generic';
    }

    // Si estamos en producción (ej: ://klyntic.com)
    const partesProd = host.split('.');
    // En *.klyntic.com, la primera parte siempre es el subdominio del tenant
    if (partesProd.length >= 3) {
      return partesProd[0];
    }
    
    return 'klyntic-generic'; // Fallback seguro
  }

  /**
   * 🏢 CONSULTA LOS DATOS DEL CRM CON CACHÉ REACTIVA (shareReplay)
   */
  getClinicaDataCached(): Observable<any> {
    const slugActual = this.obtenerSlugDeUrl();

    // Si el caché ya existe y es para el mismo slug, lo retornamos de inmediato
    if (this.clinicaCache$ && this.currentSlug === slugActual) {
      return this.clinicaCache$;
    }

    this.currentSlug = slugActual;
    
    // Endpoint de tu microservicio en Node.js mapeado en la mañana
    const urlEndpoint = `${this.URL_CRM}/consultorios/by-slug/${slugActual}`;

    this.clinicaCache$ = this.http.get<any>(urlEndpoint).pipe(
      map(response => {
        // Asumimos que tu Node.js devuelve el objeto en 'consultorio' o la raíz
        return response?.consultorio || response;
      }),
      // shareReplay(1) mantiene la última respuesta en memoria para todos los componentes suscritos
      shareReplay(1),
      catchError(error => {
        console.error(`🚨 [ClinicaService Pacientes] Error cargando tenant '${slugActual}':`, error);
        return of(null);
      })
    );

    return this.clinicaCache$;
  }

  /**
   * Limpia el caché en caliente si el paciente cambia de entorno (útil en QA/Testing)
   */
  limpiarCache(): void {
    this.clinicaCache$ = null!;
    this.currentSlug = '';
  }
}