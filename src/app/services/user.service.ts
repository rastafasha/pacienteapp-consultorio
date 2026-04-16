import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

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
    return this.http.get<User>(URL, {headers:headers});
  }

  showPatientProfile(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/patients/profile/"+user_id;
    return this.http.get<User>(URL,{headers:headers});
  }


}
