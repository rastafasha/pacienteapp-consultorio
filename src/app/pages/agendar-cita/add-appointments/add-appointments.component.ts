import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-appointments',
  templateUrl: './add-appointments.component.html',
  styleUrls: ['./add-appointments.component.scss']
})
export class AddAppointmentsComponent {
  public selectedValue!: string;

  valid_form_success: boolean = false;
  public text_validation:string = '';
  public text_success:string = '';

  hours:any;
  hour:any;
  specialities:any;
  speciality_id:any;
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

  selected_segment_hour:any;
  cargando:boolean= false;

  user:any;
  patient_selected:any;
  nuevo_usuario:any;

  constructor(
    public appointmentService:AppointmentService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public userService:UserService,
        public authService:AuthService,
  ){
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    this.authService.closeMenu();
    this.authService.getLocalStorage();
    window.scrollTo(0, 0); 
    this.cargando = true;
    this.appointmentService.listConfig().subscribe((resp:any)=>{
      this.cargando = false;
      this.hours = resp.hours;
      this.specialities = resp.specialities;
    })

    this.user;
    console.log(this.user);
    
    this.getInfoUser();
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
      speciality_id:this.speciality_id
    }
    this.appointmentService.lisFiter(data).subscribe((resp:any)=>{
      // console.log(resp);
      this.DOCTORS = resp.doctors;
    })

    this.getPrice();
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

  resetPatient(){
    this.name= '';
        this.surname= '';
        this.phone= '';
        this.n_doc= 0;
  }

  getPrice(){
    this.appointmentService.showSpeciality(this.speciality_id).subscribe((resp:any)=>{
      console.log('speciality',resp);
      this.speciality = resp;
      
    })

  }

  save(){
    this.text_validation = '';

    if(this.amount < this.amount_add){
      this.text_validation = "El Monto ingresado como adelanto no puede ser mayor al costo de la cita medica";
      return;
    }
    if(!this.name ||!this.surname|| !this.n_doc || !this.phone 
      || !this.date_appointment|| !this.speciality_id 
      || !this.selected_segment_hour 
     
    ){
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
        phone: this.phone,
        name_companion: this.name_companion,
        surname_companion: this.surname_companion,
        "date_appointment": this.date_appointment,
        "speciality_id": this.speciality_id,
        "doctor_schedule_join_hour_id": this.selected_segment_hour.id,
        amount:this.speciality.price,
        amount_add:0,
        method_payment:'Pendiente',
    }
    this.cargando = true;
    this.appointmentService.storeAppointment(data).subscribe((resp:any)=>{
      // console.log(resp);

      // this.text_success = "La Cita medica se ha creado";
      Swal.fire('Exito!', `La Cita medica se ha creado, favor espere la notificacion de confirmacion para procesar el pago`, 'success');
      this.cargando = false;
      this.router.navigate(['/app/lista']);
    })
  }

  


  selectCategory(event: any){
    let VALUE = event.target.value;
    console.log(VALUE);
    // this.subcategories_back = this.subcategories.filter((item:any) => item.category_id == VALUE);

  }


}
