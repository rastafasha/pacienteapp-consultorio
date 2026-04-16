import { Component, Input, OnInit } from '@angular/core';
import { of, delay } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css'],
    standalone: false
})
export class PerfilComponent implements OnInit {
  loading:boolean;
  obs$ = of(1).pipe(delay(500));
  
  public cargando: boolean = true;
  
  option_selected:number = 1;

  // @Input() usuario:any;
  //   @Input() patient:any;

  user:any;
  // usuario:any;
  // patient:any;
  appointments:any;
  patient_id:number;
  num_appointment:any;
  money_of_appointments:any;
  num_appointment_pendings:any;
  appointment_attention:any;
  patient_selected:any;
  appointment_pendings:any;
  user_email:any;
  patient:any=[];
  usuario:any=[];

  info = `
  <h2>Sección: Mi Perfil</h2>
  <ul>
    <li>Este es tu Ficha médica creada desde la Aplicación de tu médico Tratante</li> 
  </ul>`;

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

    // let USER = localStorage.getItem("user");
    // this.user = JSON.parse(USER ? USER: '');
    // this.user_email = this.user.email;

    
  }

  getInfoUser(){
    this.cargando = true;
    if (this.user && this.user.n_doc) {
      this.userService.showPatientByNdoc(this.user.n_doc).subscribe((resp:any)=>{
        this.patient = resp.patient.data[0];
        this.usuario = resp;
        this.cargando = false;
        if (this.patient != undefined) {
          this.getPatient();
        } else {
          console.error('Patient data is undefined');
        }
      })
    }

  }

  getPatient(){
    this.cargando = true;
    if (this.patient) {
      this.userService.showPatientProfile(this.patient.id).subscribe((resp: any) => {
      this.appointments= resp.appointments;
      this.num_appointment= resp.num_appointment;
      this.money_of_appointments= resp.money_of_appointments;
      this.num_appointment_pendings= resp.num_appointment_pendings;
      this.patient_selected= resp.patient;
      this.appointment_pendings= resp.appointment_pendings.data;
      this.appointment_attention= resp.appointments.data;
      this.cargando = false;
    })
    }
  }

  optionSelected(value: number) {
    this.option_selected = value;
  }
}
