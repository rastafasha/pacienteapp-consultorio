import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { TasaPersonalizada } from '../models/tasaPersonalizada';
const baseUrl = environment.backend_node;

@Injectable({
  providedIn: 'root'
})
export class TasapersonalizadaService {

  public tasapersonalizada!: TasaPersonalizada;

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


  getTasasByUser(iduser: string) {
    const url = `${baseUrl}/tasapersonalizada/${iduser}`;
    return this.http.get<any>(url, this.headers);
  }


  createTasa(tasa: any) {
    const url = `${baseUrl}/tasapersonalizada/crear`;
    return this.http.post(url, tasa, this.headers);
  }


 
}
