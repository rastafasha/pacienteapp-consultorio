import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { of, delay } from 'rxjs';
import { User } from 'src/app/models/user';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-grid-home',
  templateUrl: './grid-home.component.html',
  styleUrls: ['./grid-home.component.css']
})
export class GridHomeComponent implements OnInit {

  // @Input() childMessage:any=[]; //recibe la data
  // @Output() userV: EventEmitter<any>  = new EventEmitter();// envia la data
  public cargando: boolean = true;

  @Input() usuario:any;
  @Input() patient:any;
  @Input() patient_selected:any;
  
  user:any;
  appointments:any;
  appointment:any;
  patient_id:number;
  appointment_id:number;
  num_appointment:any;
  money_of_appointments:any;
  num_appointment_pendings:any;
  appointment_attention:any;
  appointment_pendings:any;
  appointment_checkeds:any;
  recetas:any;
  settting:any;
  doctor_id:any;
  address:any;
  mobile:any;
  usuario_selected:any;
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
    this.patient_selected
    console.log(this.patient_selected);
    if(this.usuario){
      this.getInfoUser();
    }
    this.getConfig();
    
  }

  getConfig(){
    this.configService.getAllConfig().subscribe((resp:any)=>{
      // console.log(resp);
      this.settting = resp.settings.data[0]
      // console.log(this.settting);
    })
  }

  getInfoUser(){
    this.userService.showPatientByNdoc(this.usuario.n_doc).subscribe((resp:any)=>{
      
      if (this.user && this.user.n_doc) {
        this.patient = resp.patient.data[0];
      } else {
        console.error('User data is undefined or n_doc is missing');
        return; // Exit if user data is not valid
      }
      this.usuario_selected = resp;
      
      if (this.patient != undefined) {
        this.getPatient();
      } else {
        console.error('Patient data is undefined');
      }
    })
  }

  getPatient(){
    this.userService.showPatientProfile(this.patient.id).subscribe((resp:any)=>{
      console.log('todo appointment',resp);
      this.patient_selected= resp.patient;
      this.appointments= resp.appointments;
      this.doctor_id= resp.patient.doctor_id;
      this.address= resp.patient.doctor.address;
      this.mobile= resp.patient.doctor.mobile;
      // this.appointment_checkeds= resp.appointment_checkeds.data[0];
      // console.log(this.appointment_checkeds);
      this.num_appointment= resp.num_appointment;
      this.appointment_pendings= resp.appointment_pendings.data;
      this.appointment_attention= resp.appointments[0].appointment_attention;

      if(resp.appointments[0].appointment_attention){
        this.recetas= resp.appointments[0].appointment_attention.receta_medica;
      }
      this.appointment= resp.appointments[0];
      
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
