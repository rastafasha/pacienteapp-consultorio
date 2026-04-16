import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Payment } from '../models/payment';
import { environment } from '../../environments/environment';

const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public payments: Payment;
  public payment: Payment;

  info:any = {};
  cargada:boolean = false;

  //datos
  // payments = 'assets/dataSimulada/pago.json';

  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('auth_token');
  }


  get headers(){
    return{
      headers: {
        'auth_token': this.token
      }
    }
  }

  get status(): 'APPROVED' | 'PENDING' | 'REJECTED' {
    return this.payment.status!;
  }
  get validacion(): 'APPROVED' | 'PENDING' | 'REJECTED' {
    return this.payment.validacion!;
  }



  

  getPagoById(id:number): Observable<any> {
    const url = `${baseUrl}/payment/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, payment: Payment}) => resp.payment)
        );
  }

  create(data:any): Observable<any> {
    const url = `${baseUrl}/payment/store`;
    return this.http.post(url, data, this.headers);
  }

  update(payment:Payment): Observable<any> {
   const url = `${baseUrl}/payment/update/${payment.id}`;
    return this.http.put(url, payment, this.headers);
  }


  deleteFoto(id) {
    return this.http.delete(baseUrl + '/payment/delete-foto/' + id);
  }


  delete(id): Observable<any> {
    const url = `${baseUrl}/payment/${id}`;
    return this.http.delete(url, this.headers);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByReference(title): Observable<any> {
    return this.http.get(`${baseUrl}/payment/?title=${title}`);
  }

  getPagosbyUser(id:number): Observable<any> {

    const url = `${baseUrl}/payment/pagosbyUser/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, payments: Payment}) => resp.payments)
        );
  }

//   getPagosbyUser(
//   patient_id:number, 
//   page=1, 
//   search_referencia='',  
//   search_status='',  
//   ){
//   let LINK = "";
//   if(search_referencia){
//   LINK+="&search_referencia="+search_referencia;
//   }
//   if(search_status){
//     LINK+="&search_status="+search_status;
//     }
  
//   const url = baseUrl+'/payment/pagosbyUser/'+patient_id+'/?page='+page+LINK;
//   return this.http.get(url, this.headers);
// }

   getRecientes(): Observable<any> {
    const url = `${baseUrl}/payment/recientes`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, payments: Payment}) => resp.payments)
      )
  }

  search(query=''){
    return this.http.get(`${baseUrl}/payment/search`, {params: {buscar: query}})

  }

}
