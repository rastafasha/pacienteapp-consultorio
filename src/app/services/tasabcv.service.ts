import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tasabcv } from '../models/tasabcba';

const baseUrl = environment.backend_node;

@Injectable({
  providedIn: 'root'
})
export class TasadollarbcvService {

  public tasadollarbcv!: Tasabcv;

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
   * 🔍 Obtiene el historial filtrado por el ID del propietario (Clínica o Médico)
   */
  getTasas(usuarioId: any): Observable<any> {
    // 🚀 SANEADO MULTI-TENANT: Inyectamos el ID del dueño en la query string
    const url = `${baseUrl}/tasadollarbcv?usuario=${usuarioId}`;
    return this.http.get<any>(url, this.headers).pipe(
      map((resp: { ok: boolean, tasas: any }) => resp.tasas)
    );
  }

  /**
   * 🎯 Recupera el último valor de liquidación registrado para este establecimiento
   */
  getUltimaTasa(usuarioId: any): Observable<any> {
    // 🚀 SANEADO MULTI-TENANT: Inyectamos el ID del dueño en la query string
    const url = `${baseUrl}/tasadollarbcv/ultimatasa?usuario=${usuarioId}`;
    return this.http.get<any>(url, this.headers).pipe(
      map((resp: { ok: boolean, tasa: any }) => resp.tasa)
    );
  }
}
