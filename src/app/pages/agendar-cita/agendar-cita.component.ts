import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AppointmentService } from '../../services/appointment.service';
import { ToastrService } from 'ngx-toastr';
import { DoctorAddress } from '../../models/DoctorAddress.model';
import { ClinicaService } from '../../services/clinica.service'; // 🚀 Asegura la importación limpia [4]

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css'],
  standalone: false
})
export class AgendarCitaComponent implements OnInit {

  @Input() categoriaSelected: any;
  public selectedValue!: string;

  // Inyectamos el servicio multi-tenant nativo que me pasaste de Express [4]
  private clinicaService = inject(ClinicaService);

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

  // Variable para almacenar el consultorio del CRM indexado en la mañana [3]
  public consultorioSelected: any = null;

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
  addresses: DoctorAddress;
  segments: any;

  constructor(
    public appointmentService: AppointmentService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER : '');
    this.user_id = this.user.id;

    // 🚀 RECTIFICACIÓN MULTI-TENANT: Llamamos al método legítimo de la app de pacientes
    this.clinicaService.getClinicaDataCached().subscribe((consultorio: any) => {
      this.consultorioSelected = consultorio;
      console.log('🏢 [AgendarCita Pacientes] Tenant y metadatos sincronizados desde Node.js:', this.consultorioSelected);
    });

    // Cargamos configuraciones base de horas y especialidades
    this.appointmentService.listConfig().subscribe((resp: any) => {
      this.hours = resp.hours;
      this.specialities = resp.specialities;
    });
  }

  getPrice() {
    this.appointmentService.showSpeciality(this.specilityie_id).subscribe((resp: any) => {
      this.speciality = resp;
    });
  }

  filtro() {
    let data = {
      date_appointment: this.date_appointment,
      hour: this.hour,
      speciality_id: this.specilityie_id
    };
    this.appointmentService.lisFiter(data).subscribe((resp: any) => {
      this.DOCTORS = resp.doctors;
    });
    this.selecteDoc = true;
  }

  countDisponibilidad(DOCTOR: any) {
    let SEGMENTS = [];
    if (DOCTOR && DOCTOR.segments) {
      SEGMENTS = DOCTOR.segments.filter((item: any) => !item.is_appointment);
    }
    return SEGMENTS.length;
  }

  showSegment(DOCTOR: any) {
    this.DOCTOR_SELECTED = DOCTOR;
    // 🚀 Sincronización Automática: al pulsar (+), llena la grilla de Supabase sin retrasos
    if (DOCTOR && DOCTOR.segments) {
      this.DOCTOR = DOCTOR.segments;
    }
  }

  showDetail(DOCTOR: any) {
    this.DOCTOR_Det_SELECTED = DOCTOR;
  }

  selecSegment(SEGMENT: any) {
    this.selected_segment_hour = SEGMENT;
  }

  back() {
    this.DOCTOR_Det_SELECTED = null;
  }

  filtroDoctor() {
    const idEspecialidadFinal = this.speciality_id || this.specilityie_id;
    const idDoctorFinal = this.DOCTOR_SELECTED?.doctor?.id || this.DOCTOR_SELECTED?.id;

    if (!this.date_appointment || !this.hour || !idEspecialidadFinal || !idDoctorFinal) {
      return;
    }

    const data = {
      date_appointment: this.date_appointment,
      hour: this.hour,
      speciality_id: idEspecialidadFinal
    };

    this.appointmentService.lisFiterByDoctor(data, idDoctorFinal).subscribe((resp: any) => {
      const respuestaDoctor = resp.doctor;
      const listaSegmentos = respuestaDoctor?.segments || resp.segments || [];

      if (resp.message === 403 || listaSegmentos.length === 0) {
        this.text_validation = resp.message_text || "No hay bloques horarios disponibles para esta fecha.";
        this.toastr.warning(this.text_validation);
        this.DOCTOR = []; 
      } else {
        this.text_validation = '';
        this.DOCTOR = listaSegmentos; // Se inyectan las 4 píldoras de 15 min con éxito
      }
    });
  }

  /**
   * ⚡ GUARDADO DEFINITIVO CON ADAPTACIÓN MULTI-TENANT BILATERAL [2]
   */
  save() {
    this.text_validation = '';
    this.speciality_id = this.speciality?.id || this.specilityie_id;

    if (!this.date_appointment || !this.speciality_id || !this.selected_segment_hour) {
      this.text_validation = "Los campos son Necesarios(Segmento de hora, fecha, especialidad, paciente, pago)";
      return;
    }

    // 🚀 1. EXTRAEMOS EL ID RELACIONAL REAL DE LARAVEL [3]
    // Jalamos la variable que inyectamos en el HomeClinicaComponent en la mañana (resultado.idRelacionalLaravel) [3]
    // Si por alguna razón de asincronía está vacío, usa el fallback seguro del CRM [2]
    const clinicaIdFinal = this.consultorioSelected?.id || this.consultorioSelected?._id || '1';

    // 🚀 2. EXTRACCIÓN DE MONTOS CENTRALIZADOS [2]
    // Prioriza el precio determinado por la especialidad configurada en Laravel [2]
    const montoFinalCita = this.speciality?.speciality?.price || 
                           this.speciality?.price || 
                           this.DOCTOR_SELECTED?.doctor?.precio_cita || 0;

    const monedaFinalCita = this.DOCTOR_SELECTED?.doctor?.moneda || 'USD';

    let data = {
      clinica_id: clinicaIdFinal,               // 🔥 ID numérico legítimo enviado a Supabase [2]
      amount: Number(montoFinalCita),           // 🔥 El precio dinámico condicionado [2]
      moneda: monedaFinalCita,                  
      doctor_id: this.DOCTOR_SELECTED?.doctor?.id || this.DOCTOR_SELECTED?.id,
      patient_id: this.user_id,
      date_appointment: this.date_appointment,
      speciality_id: Number(this.speciality_id),
      doctor_schedule_join_hour_id: this.selected_segment_hour.id,
      status_pay: 2,
      status: 1,

      // Datos tomados de tu sesión local
      name: this.user.name,
      surname: this.user.surname,
      n_doc: this.user.n_doc,
      phone: this.user.phone
    };

    console.log('📦 [storeAppointment] Despachando Payload final sanificado:', data);

    this.appointmentService.storeAppointment(data).subscribe((resp: any) => {
      this.toastr.success('¡Éxito!', `La Cita médica se ha creado de forma correcta.`);
      this.router.navigate(['/app/lista']);
    });
  }

  cancel() {
    this.date_appointment = '';
    this.hour = '';
    this.selected_segment_hour = null;
    this.DOCTOR = [];
  }

  abrirOffcanvas(idDeLaEspecialidad: string) {
    this.DOCTOR_SELECTED = null; // Modo General inicializado limpio
    this.specilityie_id = idDeLaEspecialidad;
    this.visible = true;
    this.getPrice();
  }

  abrirOffcanvasConMedicoDirecto(doctorRecibido: any) {
    if (!doctorRecibido) return;

    this.date_appointment = '';
    this.hour = '';
    this.selected_segment_hour = null;
    this.DOCTOR = []; 
    this.selecteDoc = false;

    this.specilityie_id = doctorRecibido.speciality_id || doctorRecibido.speciality?.id || 1;
    this.speciality_id = this.specilityie_id;

    // Fija al médico de modo idéntico al showSegment de la tabla
    this.DOCTOR_SELECTED = { 
      id: doctorRecibido.id, 
      doctor: doctorRecibido 
    };

    this.visible = true;
    this.getPrice();
  }

  cerrarOffcanvas() {
    this.visible = false;
    this.animandoCierre = true;
    this.cancel();
    setTimeout(() => {
      this.animandoCierre = false;
      this.specilityie_id = '';
      this.speciality = null; 
      this.DOCTORS = null; 
      this.DOCTOR_Det_SELECTED = null; 
      this.DOCTOR_SELECTED = null; 
    }, 350);
  }
}
