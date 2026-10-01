import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BackendApi = environment.backend_node;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (!req.url.startsWith('http')) {
      return next.handle(req);
    }

    // 🛡️ EL ESCUDO DE LOGIN: Si la petición va al login, que pase directo sin trabas de red
    if (req.url.includes('loginpaciente') || req.url.includes('login')) {
        return next.handle(req);
    }

    if (!req.url.startsWith('http')) {
        return next.handle(req);
    }

    let headers = new HttpHeaders();
    let params = req.params;
    
    // 🔥 EL BLINDAJE REAL: Comparamos directamente contra tu variable de entorno del Backend de Node
    const esPeticionNodeAlertas = req.url.startsWith(BackendApi);

    // 📦 Recuperamos metadatos de sesión e identificación de Klyntic
    const token = localStorage.getItem('token');
    const tenantSlug = localStorage.getItem('tenant_slug') || ''; // El slug activo de la clínica/consultorio
    const userData = localStorage.getItem('user');

    // Cabecera universal por defecto
    headers = headers.append('Accept', 'application/json');

    if (token) {
      if (esPeticionNodeAlertas) {
        // =========================================================================
        // 🔔 FORMATO EXCLUSIVO PARA NODE.JS (Alertas, Push y WebSockets del Paciente)
        // =========================================================================
        headers = headers.append('x-token', token);

        // 🚀 RECTIFICACIÓN PUSH PACIENTES: Mapeamos el ID numérico real de MySQL
        // Esto le dice a Node quién es el paciente dueño de este teléfono/navegador
        if (userData) {
          const user = JSON.parse(userData);
          if (user && user.id) {
            headers = headers.append('x-uid', user.id.toString());
          }
        }

      } else {
        // =========================================================================
        // 🦁 FORMATO EXCLUSIVO PARA LARAVEL (Base de Datos Centralizada)
        // =========================================================================
        headers = headers.append('Authorization', 'Bearer ' + token);
      }

      // =========================================================================
      // 🏢 CONTEXTO MULTI-TENANT BILATERAL: Inyectamos el slug a ambos mundos
      // =========================================================================
      if (tenantSlug) {
        // 🟢 DEJAMOS ÚNICAMENTE LA CABECERA QUE MANDA EL JUEGO EN LARAVEL
        headers = headers.append('X-Tenant-Slug', tenantSlug);
      }
    }

    return next.handle(req.clone({ headers, params })).pipe(
      catchError(error => {
        // SÓLO expulsamos si el error viene de Laravel. Si viene de Node, dejamos que la app continúe quieta.
        if ((error.status === 401 || error.status === 423) && !esPeticionNodeAlertas) {
          localStorage.clear();
          this._router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }

  errors(error: HttpErrorResponse) {
    if (error.status === 4030 || error.status === 4040 || error.status === 4230) {
      this._router.navigate(['/login']);
    }
    return throwError(error);
  }
}
