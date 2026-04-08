import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, delay } from 'rxjs';
import { Patient, User } from 'src/app/models/user';
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
        this.getPatient();
      }
    })
  }

  getPatient(){
    this.userService.showPatientProfile(this.user.id).subscribe((resp:any)=>{
      // console.log('paciente y appointment',resp);
      this.patient_selected= resp;
      this.appointments= resp.appointments;
      this.doctor_id= resp.patient.doctor_id;
      this.address= resp.patient.doctor.address;
      this.mobile= resp.patient.doctor.mobile;
      // this.appointment_checkeds= resp.appointment_checkeds.data[0];
      // console.log(this.appointment_checkeds);
      this.num_appointment= resp.num_appointment;
      this.appointment_checkeds= resp.appointment_checkeds.data;
      this.appointment_pendings= resp.appointment_pendings.data;
      this.appointment_attention = resp.appointments?.[0]?.appointment_attention || null;

      if (resp.appointments?.[0]?.appointment_attention) {
        this.recetas = resp.appointments[0].appointment_attention.receta_medica;
      } else {
        this.recetas = [];
      }
      this.appointment = resp.appointments?.[0] || null;

      // General toastr for any pending appointments
      if (this.appointment_pendings && this.appointment_pendings.length > 0) {
        this.toastr.info(`${this.appointment_pendings.length} cita(s) pendiente(s)`, 'Citas');
      }

      // Lógica para avisar si hay una cita pendiente
      const tieneCitaConfirmada = this.appointment_checkeds.some(a => a.confimation === 2);
      if (tieneCitaConfirmada) {
        this.toastr.success('Tienes citas confirmadas', 'Estado de Citas');
      }
    })
  }


  

}
