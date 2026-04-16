import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Patient, User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {
  // @Input() usuario:any;
  public cargando: boolean = true;
  
  
  user:any;
  patient:Patient;
  patient_selected:Patient;
  usuario:User;
  patient_id:number;
  appointments:any;
  num_appointment:any;
  money_of_appointments:any;
  num_appointment_pendings:any;
  appointment_pendings:any;
  appointment_checkeds:any;
  doctor_id:number;
  address:string;
  mobile:string;
  appointment_attention:any;
  recetas:any = [];
  appointment:any;

  constructor(
    public authService:AuthService,
   
    public userService:UserService,
    public activatedRoute:ActivatedRoute,
    public toastr:ToastrService,
    private router: Router,
  ) { 
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.authService.getLocalStorage();
    this.authService.closeMenu();
    this.getInfoUser();
    
  }
  
  
  getInfoUser(){
    this.cargando = true;
    this.userService.showPatientByNdoc(this.user.n_doc).subscribe((resp:any)=>{
      this.cargando = false;
      this.patient = resp.patient.data[0];
      this.usuario = resp.user[0];
      // console.log(resp);
      if (this.patient) {
        // this.getPatient();
      }
    })
  }


  

}
