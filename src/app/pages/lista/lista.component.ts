import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  standalone: false
})
export class ListaComponent implements OnInit {

  public cargando: boolean = true;

  option_selected: number = 1;

  patient: any;

  user: any;
  usuario: any;
  patient_id: any;
  appointments: any;
  num_appointment: any;
  money_of_appointments: any;
  num_appointment_pendings: any;
  patient_selected: any;
  appointment_checkeds: any;
  appointment_pendings: any;
  public moneda: string;

  info = `
  <h2>Sección: Mis Citas</h2>
  <ul>
    <li><strong>Historial de Citas:</strong> Consulta las Citas solicitadas a tu médico de confianza.</li> 
    <li><strong>Estados de las Citas:</strong> Consulta de las Citas solicitados a cada especialidad.</li> 
    <li><strong>Estados del Pago de Citas:</strong> Consulta el Estado del la deuda, si vez el botón Pagar, te llevará a registrar el pago.</li> 
    
  </ul>`;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public doctorService: DoctorService,
    public activatedRoute: ActivatedRoute,
  ) {
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getInfoUser();
  }



  getInfoUser() {
    this.userService.showPatientByNdoc(this.user.n_doc).subscribe((resp: any) => {
      this.patient = resp.patient.data;
      this.usuario = resp;
      this.patient_id = resp.patient.data[0].id;

      this.getPatient();
    })
  }



  getPatient() {
    this.cargando = true;
    this.userService.showPatientProfile(this.patient_id).subscribe((resp: any) => {
      this.patient_selected = resp.patient;
      this.num_appointment = resp.num_appointment;

      // 🚀 CAZADOR DE NULLS 1: Limpiamos la sábana global de citas (Todas)
      if (resp.appointments && resp.appointments.length > 0) {
        resp.appointments.forEach((item: any) => {
          if (!item.consultorio) {
            item.consultorio = {
              name_consultorio: 'Consultorio Central',
              address: item.doctor?.address || 'Sede de Atención'
            };
          }
        });
      }

      // 🚀 CAZADOR DE NULLS 2: Limpiamos la colección de citas Pendientes
      if (resp.appointment_pendings?.data && resp.appointment_pendings.data.length > 0) {
        resp.appointment_pendings.data.forEach((item: any) => {
          if (!item.consultorio) {
            item.consultorio = {
              name_consultorio: 'Consultorio Central',
              address: item.doctor?.address || 'Sede de Atención'
            };
          }
        });
      }

      // 🚀 CAZADOR DE NULLS 3: Limpiamos la colección de citas Atendidas/Chequeadas
      if (resp.appointment_checkeds?.data && resp.appointment_checkeds.data.length > 0) {
        resp.appointment_checkeds.data.forEach((item: any) => {
          if (!item.consultorio) {
            item.consultorio = {
              name_consultorio: 'Consultorio Central',
              address: item.doctor?.address || 'Sede de Atención'
            };
          }
        });
      }

      // Asignamos las colecciones ya sanificadas y blindadas a las variables de tu vista
      this.appointment_pendings = resp.appointment_pendings.data;
      this.appointment_checkeds = resp.appointment_checkeds.data;
      this.appointments = resp.appointments;

      this.cargando = false;
    });
  }

  optionSelected(value: number) {
    this.option_selected = value;
  }

  // ⚡ AUTOMATIZACIÓN MULTI-TAB: Retorna la colección adecuada basándose en el estado de 'option_selected'
  obtenerCitasPorFiltro(): any[] {
    switch (this.option_selected) {
      case 1:
        return this.appointment_pendings || []; // Pestaña 1 -> Pendientes
      case 2:
        return this.appointment_checkeds || []; // Pestaña 2 -> Atendidas
      case 3:
        return this.appointments || [];         // Pestaña 3 -> Todas
      default:
        return this.appointments || [];
    }
  }

}
