import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AppointmentService } from '../../services/appointment.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css'],
  standalone: false
})
export class AgendarCitaComponent implements OnInit {

  @Input() categoriaSelected: any;
  public selectedValue!: string;

  valid_form_success: boolean = false;
  public text_validation: string = '';
  public text_success: string = '';

  hours: any;
  hour: any;
  specialities: any;
  speciality_id: any;
  specilityie_id: any;
  date_appointment: any;
  speciality: any;

  id: number = 0;
  name: string = '';
  surname: string = '';
  n_doc: number = 0;
  price: any;
  phone: string = '';
  name_companion: string = '';
  surname_companion: string = '';

  amount: number = 0;
  precio_cita: number;
  amount_add: number = 0;
  method_payment: string = '';

  patient: any = [];
  DOCTORS: any = [];
  DOCTOR: any = [];
  DOCTOR_SELECTED: any;
  DOCTOR_Det_SELECTED: any;
  selecteDoc: boolean = false;
  visible: boolean = false;
  animandoCierre: boolean = false;

  selected_segment_hour: any;
  user: any;
  user_id: any;



  constructor(
    // public doctorService:DoctorService,
    public appointmentService: AppointmentService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public toastr: ToastrService,
  ) {

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER : '');
    this.user_id = this.user.id;


    this.appointmentService.listConfig().subscribe((resp: any) => {
      this.hours = resp.hours;
      this.specialities = resp.specialities;
    })
  }

  getPrice() {
    this.appointmentService.showSpeciality(this.specilityie_id).subscribe((resp: any) => {
      this.speciality = resp;
    })
  }

  filtro() {
    let data = {
      date_appointment: this.date_appointment,
      hour: this.hour,
      speciality_id: this.specilityie_id
    }
    this.appointmentService.lisFiter(data).subscribe((resp: any) => {
      this.DOCTORS = resp.doctors;
    })
    this.selecteDoc = true
  }

  countDisponibilidad(DOCTOR: any) {
    let SEGMENTS = [];
    SEGMENTS = DOCTOR.segments.filter((item: any) => !item.is_appointment);
    return SEGMENTS.length;
  }

  showSegment(DOCTOR: any) {
    this.DOCTOR_SELECTED = DOCTOR;
  }

  showDetail(DOCTOR: any) {
    this.DOCTOR_Det_SELECTED = DOCTOR;
  }

  selecSegment(SEGMENT: any,) {
    this.selected_segment_hour = SEGMENT;
  }

  back() {
    this.DOCTOR_Det_SELECTED = null;
  }


  filtroDoctor() {
    const data = {

      date_appointment: this.date_appointment,
      hour: this.hour,
      speciality_id: this.speciality_id
    }
    this.appointmentService.lisFiterByDoctor(data, this.DOCTOR_SELECTED.id).subscribe((resp: any) => {
      if (resp.message === 403 || resp.doctor.length === 0) {
        this.text_validation = resp.message_text;
        this.toastr.warning(this.text_validation);
      } else {
        this.DOCTOR = resp.doctor;
      }
    });
  }


  save() {
    this.text_validation = '';

    this.speciality_id = this.speciality.id;
    if (!this.date_appointment || !this.speciality_id
      || !this.selected_segment_hour) {
      this.text_validation = "Los campos son Necesarios(Segmento de hora, fecha, especialidad, paciente, pago)";
      return;
    }

    let data = {
      doctor_id: this.DOCTOR_SELECTED.doctor.id,
      patient_id: this.user_id,
      name: this.user.name,
      surname: this.user.surname,
      n_doc: this.user.n_doc,
      phone: this.user.phone,
      date_appointment: this.date_appointment,
      speciality_id: this.speciality_id,
      doctor_schedule_join_hour_id: this.selected_segment_hour.id,
      amount: this.DOCTOR_SELECTED.doctor.precio_cita,
      status_pay: 2,
      status: 1
    }

    this.appointmentService.storeAppointment(data).subscribe((resp: any) => {
      this.toastr.success('Exito!', `La Cita medica se ha creado`);
      this.router.navigate(['/app/lista']);
    })
  }

  cancel() {
    this.date_appointment = '';
    this.hour = '';
    this.selected_segment_hour.id = null;
  }

  abrirOffcanvas(idDeLaEspecialidad: string) {
    // 1. Guardamos el ID que nos pasó el Home en la variable global del componente
    this.specilityie_id = idDeLaEspecialidad;
    // 2. Encendemos el panel para que suba de abajo hacia arriba de una vez
    this.visible = true;
    // 3. 🔥 VOLVEMOS A DISPARAR LA CONSULTA: Ahora con el ID fresco recibido en caliente
    this.getPrice();
  }

  cerrarOffcanvas() {
    // 1. Apagamos la clase '.show'. Esto activa la animación CSS nativa de Bootstrap hacia abajo
    this.visible = false;
    this.animandoCierre = true;

    // 2. 🔥 EL TRUCO: Esperamos 350ms (lo que tarda la transición de Bootstrap) antes de ocultar físicamente el div
    setTimeout(() => {
      this.animandoCierre = false;
      this.specilityie_id = '';
      this.speciality = null; // Limpiamos los datos de doctores para la próxima apertura
    }, 350);
    this.cancel();
  }


}
