import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
const baseUrl = environment.url_servicios;
@Injectable({
  providedIn: 'root'
})
export class PublicidadService {

  constructor(
    public http: HttpClient,
    public authService:AuthService
  ) { }

  

  listPublicidadActivos(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = baseUrl+'/pub/activos';
    return this.http.get(URL, {headers:headers});
  }
  
  
}
