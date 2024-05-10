import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express-serve-static-core';
import { of, delay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  // public cargando: boolean = true;
  
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
    
    this.userService.showPatientByNdoc(this.user.n_doc).subscribe((resp:any)=>{
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
      // console.log('todo appointment',resp);
      this.patient_selected= resp.patient;
      this.appointments= resp.appointments;
      this.appointment_pendings= resp.appointment_pendings.data;
      // this.num_appointment= resp.num_appointment;
      // this.money_of_appointments= resp.money_of_appointments;
      // this.num_appointment_pendings= resp.num_appointment_pendings;
    })
  }

}
