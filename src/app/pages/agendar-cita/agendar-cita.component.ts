import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent implements OnInit {

  public selectedValue!: string;
  public cargando: boolean = true;
  public cargandoPago: boolean = true;

  valid_form_success: boolean = false;
  public text_validation:string = '';
  public text_success:string = '';

  hours:any;
  hour:any;
  specialities:any;
  speciality_id:any;
  specilityie_id:any;
  date_appointment:any;
  speciality:any;
  
  id:number = 0;
  name:string = '';
  surname:string = '';
  n_doc:number = 0;
  price:any;
  phone:string = '';
  name_companion:string = '';
  surname_companion:string = '';
  
  amount:number = 0;
  amount_add:number = 0;
  method_payment:string = '';

  patient:any = [];
  DOCTORS:any = [];
  DOCTOR:any = [];
  DOCTOR_SELECTED:any;
  user:any;

  selected_segment_hour:any;
  patient_selected:any;

  

  constructor(
    public appointmentService:AppointmentService,
    // public doctorService:DoctorService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public userService:UserService,
    public authService:AuthService,
  ){
    this.user = this.authService.user;

  }

  ngOnInit(): void {
    // this.doctorService.closeMenuSidebar();
    window.scrollTo(0, 0);
    this.cargando = true;
    this.activatedRoute.params.subscribe((resp:any)=>{
      // console.log(resp);
      this.specilityie_id = resp.id;
      this.cargando = false;
      
    });
    this.getPrice();
    this.appointmentService.listConfig().subscribe((resp:any)=>{
      this.hours = resp.hours;
      this.specialities = resp.specialities;
    })

    // this.user;
    
    if(this.user === null || !this.user){
      this.user = this.authService.user;
      this.getInfoUser();
    }
    console.log(this.user);
    
  }
  

  getPrice(){
    this.appointmentService.showSpeciality(this.specilityie_id).subscribe((resp:any)=>{
      console.log('speciality',resp);
      this.speciality = resp;
      
    })

  }

  getInfoUser(){
    this.userService.showPatientByNdoc(this.user.n_doc).subscribe((resp:any)=>{
      this.patient_selected = resp.patient;
      this.filterPatient();
    })
  }
  
  filtro(){
    let data = {
      date_appointment:this.date_appointment,
      hour:this.hour,
      speciality_id:this.specilityie_id
    }
    this.appointmentService.lisFiter(data).subscribe((resp:any)=>{
      // console.log(resp);
      this.DOCTORS = resp.doctors;
      
    })
  }

  countDisponibilidad(DOCTOR:any){
    let SEGMENTS = [];
    SEGMENTS = DOCTOR.segments.filter((item:any)=> !item.is_appointment);
    return SEGMENTS.length;
  }

  showSegment(DOCTOR:any){
    this.DOCTOR_SELECTED = DOCTOR;
  }

  selecSegment(SEGMENT:any){
    this.selected_segment_hour = SEGMENT;
  }


  filterPatient(){
    this.appointmentService.getPatient(this.patient_selected.n_doc+"").subscribe((resp:any)=>{
      // console.log(resp);
      this.patient = resp;
      if(resp.menssage === 403){
        this.name= '';
        this.surname= '';
        this.phone= '';
        this.n_doc= 0;
      }else{
        this.name= resp.name;
        this.surname= resp.surname;
        this.phone= resp.phone;
        this.n_doc= resp.n_doc;
      }
    })
  }
  filterPatientNew(){
    this.appointmentService.getPatient(this.n_doc+"").subscribe((resp:any)=>{
      // console.log(resp);
      this.patient = resp;
      if(resp.menssage === 403){
        this.name= '';
        this.surname= '';
        this.phone= '';
        this.n_doc= 0;
      }else{
        this.name= resp.name;
        this.surname= resp.surname;
        this.phone= resp.phone;
        this.n_doc= resp.n_doc;
      }
    })
  }

  resetPatient(){
    this.name= '';
        this.surname= '';
        this.phone= '';
        this.n_doc= 0;
  }

  save(){debugger
    this.text_validation = '';

    this.speciality_id = this.speciality.id;

    // if(this.amount < this.amount_add){
    //   this.text_validation = "El Monto ingresado como adelanto no puede ser mayor al costo de la cita medica";
    //   return;
    // }
    if(!this.name ||!this.surname|| !this.n_doc || !this.phone 
      || !this.date_appointment|| !this.speciality_id
      || !this.selected_segment_hour ){
      this.text_validation = "Los campos son Necesarios(Segmento de hora, fecha, especialidad, paciente, pago)";
      return;
    }

    let data ={
      "doctor_id": this.DOCTOR_SELECTED.doctor.id,
        // "patient_id": ,
        user_id:this.patient.id,
        name: this.name,
        surname: this.surname,
        n_doc: this.n_doc,
        email:this.user.email,
        phone: this.phone,
        name_companion: this.name_companion,
        surname_companion: this.surname_companion,
        "date_appointment": this.date_appointment,
        "speciality_id": this.speciality_id,
        "doctor_schedule_join_hour_id": this.selected_segment_hour.id,
        amount:this.speciality.price,
        amount_add:0,
        method_payment:'Pendiente',
        // amount:this.amount,
        // amount_add:this.amount_add,
        // method_payment:this.method_payment,
      }
      this.cargando = true;
    this.appointmentService.storeAppointment(data).subscribe((resp:any)=>{
      // console.log(resp);
      // this.text_success = "La Cita medica se ha creado, favor espere la notificacion de confirmacion para procesar el pago";
      // this.cargando = false;
      // Swal.fire('Exito!', `La Cita medica se ha creado, favor espere la notificacion de confirmacion para procesar el pago`, 'success');
      // this.router.navigate(['/app/lista']);

      if(resp.message == 403){
        // Swal.fire('Actualizado', this.text_validation, 'success');
        this.text_validation = resp.message_text;
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: this.text_validation,
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        // Swal.fire('Actualizado', this.text_success, 'success' );
        // this.text_success = 'La Cita medica se ha creado, favor espere la verificacion de  el pago';
        this.text_success = 'Se envio la solicitud de la cita médica'
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: this.text_success,
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/app/lista']);
    }
    })
  }

  cancel(){
    this.name= '';
    this.surname= '';
    this.phone= '';
    this.n_doc= 0;
    this.name_companion= '';
    this.surname_companion= '';
    this.date_appointment= '';
    this.hour= '';
    this.selected_segment_hour.id = 0;
  }


}
