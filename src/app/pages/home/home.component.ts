import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { of, delay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // @Input() usuario:any;
  public cargando: boolean = true;
  
  
  user:any;
  usuario:any;
  patient_id:number;
  patient:any = [];
  appointments:any;
  num_appointment:any;
  money_of_appointments:any;
  num_appointment_pendings:any;
  patient_selected:any;
  appointment_pendings:any;

  constructor(
    public authService:AuthService,
   
    public userService:UserService,
    public activatedRoute:ActivatedRoute,
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
      // console.log(resp);
      this.patient = resp.patient.data;
      // console.log('patient', this.patient);
      this.usuario = resp;
      this.patient_id = resp.patient.data[0].id;
      // console.log(this.patient_id);
      
      this.getPatient();
    })
  }

  getPatient(){
    this.userService.showPatientProfile(this.patient_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.patient_selected= resp.patient;
    })
  }

}
