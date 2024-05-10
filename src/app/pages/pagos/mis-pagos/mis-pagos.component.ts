import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mis-pagos',
  templateUrl: './mis-pagos.component.html',
  styleUrls: ['./mis-pagos.component.css']
})
export class MisPagosComponent implements OnInit {
  
  public cargando: boolean = true;


  patient:any;
  
  user:any;
  usuario:any;
  patient_id:any;
  appointment_id:any;
  appointments:any;
  payments:any = [];
  appointment:any;
  patient_selected:any;
  paymentSelected:any;

  constructor(
    public authService:AuthService,
    public userService:UserService,
    public paymentService:PaymentService,
    public appoitmentService:AppointmentService,
    public activatedRoute:ActivatedRoute,
  ) { 
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getInfoUser();
    this.authService.closeMenu();
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
      this.getPatientPayments();
    })
  }

  getPatient(){
    this.cargando = true;
    this.userService.showPatientProfile(this.patient_id).subscribe((resp:any)=>{
      this.cargando = false;
      this.patient_selected= resp.patient;
      this.appointments= resp.appointments;
    })
  }


  getPatientPayments(){
    this.cargando = true;
    this.paymentService.getPagosbyUser(this.patient_id).subscribe((resp:any)=>{
      this.cargando = false;
      // console.log(resp.data);
      this.payments= resp.data;
      // this.appointment_id = resp.data.appointment_id;
      // console.log(this.appointment_id);
    })
    // this.getInfoCita();
  }

  // getInfoCita(){
  //     this.appoitmentService.showAppointment(this.appointment_id).subscribe((resp:any)=>{
  //       console.log(resp);
  //       this.appointment = resp.appointment;
        
  //     })
  //   }


  selectedPayment(payment:any){
    this.paymentSelected = payment
    
  }

  back(){
    this.paymentSelected = null;
  }

}
