import { Component, Input, OnInit, } from '@angular/core';
import { User, Patient } from '../../models/user';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';
import { ConfigService } from '../../services/config.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-grid-home',
  templateUrl: './grid-home.component.html',
  styleUrls: ['./grid-home.component.css']
})
export class GridHomeComponent implements OnInit {

  public cargando: boolean = true;

  @Input() usuario:User;
  @Input() patient:Patient;
  
  user:any;
  appointments:any;
  appointment:any;
  patient_id:number;
  appointment_id:number;
  num_appointment:number;
  money_of_appointments:number;
  num_appointment_pendings:number;
  appointment_attention:any=[];
  appointment_pendings:number;
  appointment_checkeds:number;
  recetas:any=[];
  settting:any=[];
  doctor_id:number;
  address:string;
  mobile:string;
  usuario_selected:any=[];
  patient_selected:any=[];
  n_doc?:number;

  constructor(
    public authService:AuthService,
    public userService:UserService,
    public configService:ConfigService,
    public appoitmentService:AppointmentService,
  ) { 
    // this.user = this.authService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.authService.getLocalStorage();
    this.authService.closeMenu();
    this.patient_selected = this.patient;
    this.getConfig();
    this.getPatientInfo();
    
  }

  getConfig(){
    this.configService.getAllConfig().subscribe((resp:any)=>{
      this.settting = resp.settings.data[0]
    })
  }

  getPatientInfo(){
    this.cargando = true
    this.userService.showPatientProfile(this.patient.id).subscribe((resp:any)=>{
      this.patient_selected= resp.patient;
      this.appointments= resp.appointments;
      this.doctor_id= resp.patient.doctor_id;
      this.address= resp.patient.doctor.address;
      this.mobile= resp.patient.doctor.mobile;
      // this.appointment_checkeds= resp.appointment_checkeds.data[0];
      // console.log(this.appointment_checkeds);
      this.num_appointment= resp.num_appointment;
      this.appointment_pendings= resp.appointment_pendings.data;
      this.appointment_attention = resp.appointments?.[0]?.appointment_attention || null;
      if (resp.appointments?.[0]?.appointment_attention) {
        this.recetas = resp.appointments[0].appointment_attention.receta_medica;
      } else {
        this.recetas = [];
      }
      this.appointment = resp.appointments?.[0] || null;
      this.cargando = false
    })
  }



   openOrange(){

    var modalcart = document.getElementsByClassName("div-restaurant");
      for (var i = 0; i<modalcart.length; i++) {
         modalcart[i].classList.toggle("div-restaurant-activo");
         var modalcart = document.getElementsByClassName("datoscita");
         modalcart[i].classList.toggle("datoscita_mostrar");
         var modalcart = document.getElementsByClassName("oculto-cita");
         modalcart[i].classList.toggle("mostrarcita");


      }
  }

   openGreen(){

    var modalcart = document.getElementsByClassName("div-mercados");
    for (var i = 0; i<modalcart.length; i++) {
        modalcart[i].classList.toggle("div-mercados-activo");
        var modalcart = document.getElementsByClassName("oculto");
         modalcart[i].classList.toggle("mostrar");
        var modalcart = document.getElementsByClassName("perfil-home");
         modalcart[i].classList.toggle("perfil-home-acc");
         
        }
    }
    
     openBlue(){
        
        var modalcart = document.getElementsByClassName("div-farmacia");
        for (var i = 0; i<modalcart.length; i++) {
            modalcart[i].classList.toggle("div-farmacia-activa");
            var modalcart = document.getElementsByClassName("datosmedicinas-oculto");
             modalcart[i].classList.toggle("datosmedicinas");

      }
  }

   openYellow(){

    var modalcart = document.getElementsByClassName("div-bebida");
      for (var i = 0; i<modalcart.length; i++) {
         modalcart[i].classList.toggle("div-bebida-activa");
         var modalcart = document.getElementsByClassName("oculto-datosrecipe");
         modalcart[i].classList.toggle("mostrar-datosrecipe");

      }
  }

 

}
