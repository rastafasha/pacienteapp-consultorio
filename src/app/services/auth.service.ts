import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import Swal from 'sweetalert2';
import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { PasswordForm } from '../auth/interfaces/password-form.interface';

const url_servicios = environment.url_servicios;

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user:User;
  token:any;

  constructor(
    private router: Router,
    public http: HttpClient
    ) {
      this.getLocalStorage();//devuelve el usuario logueado
    }

  
  
  getLocalStorage(){
    // Get current URL to check if we're on change-password route
    const currentUrl = window.location.href;
    
    // Allow change-password route with token to work without being logged in
    if (currentUrl.includes('/change-password') && currentUrl.includes('token=')) {
      this.user = null;
      return; // Don't redirect, allow access to change-password page
    }
    
    if(localStorage.getItem('token') && localStorage.getItem('user')){
      let USER = localStorage.getItem('user');
      this.user = JSON.parse(USER ? USER: '');
      this.router.navigateByUrl('/app/home');
    }else{
      this.user = null; // Set user to null if not found
      this.router.navigateByUrl('/login');
    }
    // console.log(this.user); // Log the user data for debugging
    
 }

   saveLocalStorage(auth:any){
    if(auth && auth.access_token){
      localStorage.setItem("token",auth.access_token.original.access_token);
      localStorage.setItem("user",JSON.stringify(auth.user));
      localStorage.setItem('authenticated', 'true');
      return true;
    }
    return false;
  }

  

   
  // login(email:string,password:string) {
  //   let URL = url_servicios+"/login";
  //   return this.http.post(URL,{email: email,password: password}).pipe(
  //     map((auth:any) => {
  //       console.log(auth);
  //       const result = this.saveLocalStorage(auth);
  //       return result;
  //     }),
  //     catchError((error:any) => {
  //       console.log(error);
  //       return of(undefined);
  //     })
  //   );
  // }

  guardarLocalStorage( user:any, access_token: any){
    // localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', access_token.original.access_token);
  }


  login(email:string,password:string){

    // return this.http.post<any>(`${this.serverUrl}/login`, {email: email, password: password}, { withCredentials: false })

    let URL = url_servicios+"/login";
    return this.http.post(URL, {email: email,password: password})
    .pipe(
      map((auth:any) => {
        console.log(auth);
        const result = this.guardarLocalStorage(auth.user, auth.access_token);
        return result;
      }),
      catchError((error:any) => {
        Swal.fire('Error', error.error.error, 'error');
        // console.log(error.error.error);
        return of(undefined);
      })
    )

  }

  crearUsuario(formData: RegisterForm){
    let URL = url_servicios+"/register";
    return this.http.post(URL, formData)
    .pipe(map(user => {
      localStorage.setItem('auth_token', JSON.stringify(user));

      return user;
    }));
  }



 

 logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('authenticated');
  this.router.navigateByUrl('/login');
 }


 closeMenu(){
  var menuLateral = document.getElementsByClassName("sidemenu ");
  for (var i = 0; i<menuLateral.length; i++) {
     menuLateral[i].classList.remove("active");
  }
}

getLocalDarkMode(){
  setTimeout(()=>{
    if(localStorage.getItem('darkmode')){
        var element = document.body;
      element.classList.add("darkmode");
      
    }

  },500)
  // console.log(this.user);
  
}


  forgotPassword(formData:any){
    return this.http.post(`${url_servicios}/forgot-password`, formData)

  }

  changePassword(formData:any){
    return this.http.post(`${url_servicios}/change-forgot-password`, formData)

  }

  resetPassword(formData:PasswordForm){
    return this.http.post(`${url_servicios}/reset-password`, formData)

  }
  newPassword(formData:PasswordForm){
    return this.http.post(`${url_servicios}/change-password`, formData)

  }
  

}
