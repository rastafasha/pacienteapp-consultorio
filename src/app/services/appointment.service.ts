import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

const url_servicios = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  
  constructor(
    public http: HttpClient,
    public authService: AuthService,

  ) { }

  listConfig(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/appointment/config';
    return this.http.get(URL, {headers:headers});
  }
  listAppointementAtendidas(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/appointment/atendidas';
    return this.http.get(URL, {headers:headers});
  }

  lisFiter(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/appointment/filter";
    return this.http.post(URL,data, {headers:headers});
  }

  getPatient(n_doc:string =''){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/appointment/patient?n_doc="+n_doc;
    return this.http.get(URL, {headers:headers});
  }
  
  

  storeAppointment(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/appointment/store";
    return this.http.post(URL,data, {headers:headers});
  }
  
  showAppointment(appointment_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/appointment/show/"+appointment_id;
    return this.http.get(URL,{headers:headers});
  }
  showSpeciality(speciality:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/specialities/show/"+speciality;
    return this.http.get(URL,{headers:headers});
  }

  editAppointment(data:any, appointment_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/appointment/update/"+appointment_id;
    return this.http.put(URL,data,{headers:headers});
  }
  

  //cita medica
  
  showCitamedica(appointment_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/appointment-atention/show/"+appointment_id;
    return this.http.get(URL,{headers:headers});
  }


  getLaboratoryByAppointment(appointment_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/laboratory/showByAppointment/"+appointment_id;
    return this.http.get(URL,{headers:headers});
  }
}
