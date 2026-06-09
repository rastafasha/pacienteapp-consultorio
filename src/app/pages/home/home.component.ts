import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Patient, User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AgendarCitaComponent } from '../agendar-cita/agendar-cita.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {
  // 🔥 CAPTURAMOS EL COMPONENTE HIJO MEDIANTE SU VARIABLE DE REFERENCIA EN EL HTML
  @ViewChild('panelCita') citaOffcanvas!: AgendarCitaComponent;

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
      if (this.patient) {
      }
    })
  }

recibirEspecialidadDelHijo(idEspecialidad: string) {
    console.log("🚀 El Home da la orden de abrir el Offcanvas de Citas");
    this.citaOffcanvas.abrirOffcanvas(idEspecialidad);
  }
  

}
