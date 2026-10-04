import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {
  
  private http = inject(HttpClient);
  
  // URL base del CRM de Node.js parametrizada desde tu environment
  private readonly URL_CRM = environment.backend_CRM_node;
  
  // Caché en memoria (mantenido por compatibilidad estructural)
  private clinicaCache$!: Observable<any>;
  private currentSlug: string = '';

  /**
   * 🧽 BYPASS UNIVERSAL: Forzado a 'consultorio'
   * Se elimina la lógica de extracción por subdominio (*.klyntic.com) 
   * para consolidar la visión de PWA Universal donde el paciente es global.
   */
  obtenerSlugDeUrl(): string {
    // Retorna siempre la cadena fija pactada para limpiar la grasa relacional Enterprise
    return 'consultorio';
  }

  /**
   * 🏢 CONSULTA CONFIGURACIÓN GLOBAL (Optimizado)
   * Cortocircuita la llamada a MongoDB Atlas si no es estrictamente necesaria,
   * retornando un objeto básico de configuración unificada para el portal.
   */
  getClinicaDataCached(): Observable<any> {
    const slugActual = this.obtenerSlugDeUrl(); // Siempre será 'consultorio'

    // Retorno rápido reactivo simulando el objeto base sin golpear la base de datos de Render
    return of({
      slug: slugActual,
      nombre: 'Klyntic Portal Universal',
      modo: 'PWA-Global'
    });
  }

  /**
   * Limpia el caché en caliente (Mantenido por compatibilidad)
   */
  limpiarCache(): void {
    this.clinicaCache$ = null!;
    this.currentSlug = '';
  }
}
