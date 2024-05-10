import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
declare var $:any;
const url_servicios = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,

  ) { }

  getAllConfig(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/setting';
    return this.http.get(URL, {headers:headers});
  }

  showPatientProfile(setting_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/setting/show/"+setting_id;
    return this.http.get(URL,{headers:headers});
  }

  getAllSettings(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/setting';
    return this.http.get(URL, {headers:headers});
    
  }

}
