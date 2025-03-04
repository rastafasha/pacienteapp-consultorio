import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { User } from '../models/user';
const url_servicios = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  
    constructor(
      public http: HttpClient,
      public authService: AuthService,
  
    ) { }
  
    list(){
      let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
      let URL = url_servicios+'/presupuesto';
      return this.http.get(URL, {headers:headers});
    }
    
    byPatient(n_doc:any){
      let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
      let URL = url_servicios+'/presupuesto/bypatient/'+n_doc;
      return this.http.get(URL, {headers:headers});
    }
    byId(id:any){
      let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
      let URL = url_servicios+'/presupuesto/show/'+id;
      return this.http.get(URL, {headers:headers});
    }
    
    
  
}
