import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TasaEurobcv } from '../models/tasaeurobcv';

const baseUrl = environment.backend_node;

@Injectable({
  providedIn: 'root'
})
export class TasaeurobcvService {

  public tasaeurobcv!: TasaEurobcv;

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }


  get headers() {
    return {
      headers: {
        'auth_token': this.token
      }
    }
  }


   /**
   * 🔍 Obtiene el historial de tasas Euro filtrado por el ID del propietario (Clínica o Médico)
   */
  getTasas(usuarioId: any): Observable<any> {
    // 🚀 SANEADO MULTI-TENANT: Inyectamos el ID del dueño en la query string
    const url = `${baseUrl}/tasaeurobcv?usuario=${usuarioId}`;
    return this.http.get<any>(url, this.headers).pipe(
      map((resp: { ok: boolean, tasas: any }) => resp.tasas)
    );
  }

  /**
   * 🎯 Recupera el último valor de liquidación de Euros registrado para este establecimiento
   */
  getUltimaTasa(usuarioId: any): Observable<any> {
    // 🚀 SANEADO MULTI-TENANT: Inyectamos el ID del dueño en la query string
    const url = `${baseUrl}/tasaeurobcv/ultimatasa?usuario=${usuarioId}`;
    return this.http.get<any>(url, this.headers).pipe(
      map((resp: { ok: boolean, tasa: any }) => resp.tasa)
    );
  }

  
}
