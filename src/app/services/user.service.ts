import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
declare var $:any;
const url_servicios = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,

  ) { }

  showPatientByNdoc(n_doc:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/user/show/ndoc/'+n_doc;
    return this.http.get(URL, {headers:headers});
  }

  showPatientProfile(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/patients/profile/"+user_id;
    return this.http.get(URL,{headers:headers});
  }


}
