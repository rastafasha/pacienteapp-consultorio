import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AuthService } from './auth.service';
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
}
