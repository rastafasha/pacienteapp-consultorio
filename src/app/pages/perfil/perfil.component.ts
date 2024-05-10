import { Component, OnInit } from '@angular/core';
import { of, delay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  loading:boolean;
  obs$ = of(1).pipe(delay(500));
  
  

  user:any;
  usuario:any;
  patient:any;
  appointments:any;
  patient_id:number;
  num_appointment:any;
  money_of_appointments:any;
  num_appointment_pendings:any;
  appointment_attention:any;
  patient_selected:any;
  appointment_pendings:any;

  constructor(
    public authService:AuthService,
    public userService:UserService,
  ) { 
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.authService.closeMenu();
    this.getInfoUser();
    
  }

  getInfoUser(){
    this.userService.showPatientByNdoc(this.user.n_doc).subscribe((resp:any)=>{
      // console.log(resp);
      this.patient = resp.patient.data[0];
      // console.log('patient', this.patient);
      this.usuario = resp;
      // console.log('usuario', this.usuario);
      // console.log('appointments', this.appointments);
      this.patient_id = resp.patient.data[0].id;
      // console.log(this.patient_id);

      this.getPatient();
    })
  }

  getPatient(){
    this.userService.showPatientProfile(this.patient_id).subscribe((resp:any)=>{
      // console.log('todo appointment',resp);
      this.appointments= resp.appointments;
      this.num_appointment= resp.num_appointment;
      this.money_of_appointments= resp.money_of_appointments;
      this.num_appointment_pendings= resp.num_appointment_pendings;
      this.patient_selected= resp.patient;
      this.appointment_pendings= resp.appointment_pendings.data;
      this.appointment_attention= resp.appointments.data;
      // console.log('appointment_pendings',this.appointment_pendings);
    })
  }
}
