import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent implements OnInit {

  public selectedValue!: string;

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
  precio_cita:number;
  amount_add:number = 0;
  method_payment:string = '';

  patient:any = [];
  DOCTORS:any = [];
  DOCTOR:any = [];
  DOCTOR_SELECTED:any;
  DOCTOR_Det_SELECTED:any;

  selected_segment_hour:any;
  user:any;
  user_id:any;

  

  constructor(
    // public doctorService:DoctorService,
    public appointmentService:AppointmentService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ){

  }

  ngOnInit(): void {
    // this.doctorService.closeMenuSidebar();
    window.scrollTo(0, 0);
    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.user_id = this.user.id;

    this.activatedRoute.params.subscribe((resp:any)=>{
      // console.log(resp);
      this.specilityie_id = resp.id;
      
    });
    this.getPrice();
    this.appointmentService.listConfig().subscribe((resp:any)=>{
      this.hours = resp.hours;
      this.specialities = resp.specialities;
    })
  }

  getPrice(){
    this.appointmentService.showSpeciality(this.specilityie_id).subscribe((resp:any)=>{
      console.log('speciality',resp);
      this.speciality = resp;
      
    })

  }
  
  filtro(){
    let data = {
      date_appointment:this.date_appointment,
      hour:this.hour,
      speciality_id:this.specilityie_id
    }
    this.appointmentService.lisFiter(data).subscribe((resp:any)=>{
      console.log(resp);
      this.DOCTORS = resp.doctors;
    })
  }

  countDisponibilidad(DOCTOR:any){
    let SEGMENTS = [];
    SEGMENTS = DOCTOR.segments.filter((item:any)=> !item.is_appointment);
    return SEGMENTS.length;
  }

  showSegment(DOCTOR: any) {
    this.DOCTOR_SELECTED = DOCTOR;
    // this.router.navigateByUrl(`/agendar-cita/form/${DOCTOR.doctor.id}`);
  }

  showDetail(DOCTOR:any){
    this.DOCTOR_Det_SELECTED = DOCTOR;
  }

  selecSegment(SEGMENT:any, ){
    this.selected_segment_hour = SEGMENT;
  }

  back(){
    this.DOCTOR_Det_SELECTED = null;
    // this.DOCTOR_SELECTED = !this.DOCTOR_SELECTED;
  }

  precioCita(){

  }

  filterPatient(){
    this.appointmentService.getPatient(this.n_doc+"").subscribe((resp:any)=>{
      // console.log(resp);
      this.patient = resp;
      if(resp.menssage === 403){
        this.name= '';
        this.surname= '';
        this.phone= '';
        this.n_doc= 0;
        // this.text_validation = "Este documento no existe en nuestra base de datos";
        // Swal.fire('Info!', `Este documento no existe en nuestra base de datos, deseas registrarlo?`, 'info');
      }else{
        this.name= resp.name;
        this.surname= resp.surname;
        this.phone= resp.phone;
        this.n_doc= resp.n_doc;
      }
    })
  }

  filtroDoctor(){
    // this.isfiltered = false;
    const data = {

    date_appointment:this.date_appointment,
    hour:this.hour,
    speciality_id:this.speciality_id
  }
  this.appointmentService.lisFiterByDoctor(data, this.DOCTOR_SELECTED.id).subscribe((resp: any) => {
    // if (resp && resp.doctor && Array.isArray(resp.doctor)) {
    console.log('doctor filtrado',resp);
    // this.isfiltered = false;
   
    if (resp.message === 403 || resp.doctor.length === 0) {
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
      
      this.DOCTOR = resp.doctor;
      console.log(resp.doctor);
      // this.isfiltered = true;
    }
    

  });
}

  resetPatient(){
    this.name= '';
        this.surname= '';
        this.phone= '';
        this.n_doc= 0;
  }

  save(){
    this.text_validation = '';

    this.speciality_id = this.speciality.id;

    // if(this.amount < this.amount_add){
    //   this.text_validation = "El Monto ingresado como adelanto no puede ser mayor al costo de la cita medica";
    //   return;
    // }
    if(!this.name ||!this.surname || !this.phone 
      || !this.date_appointment|| !this.speciality_id
      || !this.selected_segment_hour ){
      this.text_validation = "Los campos son Necesarios(Segmento de hora, fecha, especialidad, paciente, pago)";
      return;
    }

    let data ={
        doctor_id: this.DOCTOR_SELECTED.doctor.id,
        // "patient_id": ,
        user_id:this.user_id,
        name: this.name,
        surname: this.surname,
        n_doc: this.n_doc,
        phone: this.phone,
        name_companion: this.name_companion,
        surname_companion: this.surname_companion,
        date_appointment: this.date_appointment,
        speciality_id: this.speciality_id,
        doctor_schedule_join_hour_id: this.selected_segment_hour.id,
        amount:this.DOCTOR_SELECTED.doctor.precio_cita,
        amount_add:0,
        method_payment:'Pendiente',
        // amount:this.amount,
        // amount_add:this.amount_add,
        // method_payment:this.method_payment,
      }

    this.appointmentService.storeAppointment(data).subscribe((resp:any)=>{
      // console.log(resp);
      // this.text_success = "La Cita medica se ha creado, favor espere la notificacion de confirmacion para procesar el pago";
      Swal.fire('Exito!', `La Cita medica se ha creado, favor espere la notificacion de confirmacion para procesar el pago`, 'success');
      this.router.navigate(['/app/lista']);
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
