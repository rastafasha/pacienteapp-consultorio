import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, Patient } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-citas',
    templateUrl: './citas.component.html',
    styleUrls: ['./citas.component.css'],
    standalone: false
})
export class CitasComponent implements OnInit {

  cargando = false;
  @Input() usuario:User;
  @Input() patient:Patient;
  
  user:any;
  patient_id:number;
  patient_data:any = [];
  appointments:any;
  num_appointment:any;
  money_of_appointments:any;
  num_appointment_pendings:any;
  appointment_pendings:any [];


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
    this.usuario;
    this.patient;
    this.getPatientInfo();
    
  }

  getPatientInfo(){
    this.cargando = true;
    this.userService.showPatientProfile(this.patient.id).subscribe((resp:any)=>{
      this.num_appointment= resp.num_appointment;
      this.appointment_pendings= resp.appointment_pendings.data;
      this.cargando = false;
      
    })
  }

  

}
