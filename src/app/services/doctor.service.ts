import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
const url_servicios = environment.url_servicios;
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

   constructor(
      public http: HttpClient,
      public authService: AuthService,
  
    ) { }
  
    showDoctor(id:any){
      let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
      let URL = url_servicios+'/doctors/show/'+id;
      return this.http.get<User>(URL, {headers:headers});
    }
  
    showDoctorProfile(doctor_id:any){
      let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
      let URL = url_servicios+"/doctors/profile/"+doctor_id;
      return this.http.get<User>(URL,{headers:headers});
    }


  // 🏥 ========================================================
  // MÉTODOS ADICIONALES PARA GESTIÓN DE CONSULTORIOS INDEPENDIENTES
  // ========================================================

  // 1. Obtener la lista de consultorios de un médico específico
  getAddressesByDoctor(doctorId: number): Observable<any> {
    const url = `${url_servicios}/doctor-addresses/doctor/${doctorId}`;
    return this.http.get<any>(url);
  }

 
}
