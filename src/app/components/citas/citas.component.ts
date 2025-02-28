import { Component, Input, OnInit } from '@angular/core';
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
  @Input() usuario:any=[]; //recibe la data
  
  user:any;
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

    this.usuario = this.usuario.patient;
    this.getAppointments();
    
  }
  
  

 

  getAppointments(){
    this.userService.showPatientProfile(this.usuario.id ).subscribe((resp:any)=>{
      // console.log('todo appointment',resp);
      this.appointments= resp.appointments;
      this.appointment_pendings= resp.appointment_pendings.data;
    })
  }

}
