import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';

declare var bootstrap: any;
@Component({
  selector: 'app-mis-pagos',
  templateUrl: './mis-pagos.component.html',
  styleUrls: ['./mis-pagos.component.css']
})
export class MisPagosComponent implements OnInit {

  public cargando: boolean = true;
  patient: any;
  user: any;
  usuario: any;
  patient_id: any;
  appointment_id: any;
  appointments: any;
  payments: any = [];
  appointment: any;
  patient_selected: any;
  paymentSelected: any;

  query: string = '';
  status!: string;
  statusPago: string = '';
  isFiltering = false;
  showToast = false;
  showToastFactura = false;
  pagoSeleccionado: any;

  info = `
  <h2>Sección: Mis Pagos</h2>
  <p>En este apartado podrás:</p>
  <ul>
    <li><strong>Consultar el historial</strong> de tus pagos, identificados con colores según su estatus (Pendiente, Aprobado o Rechazado).</li>
    <li><strong>Localizar transacciones</strong> rápidamente buscando por fecha, número de referencia o monto.</li>
    <li><strong>Filtrar la lista</strong> para ver solo los pagos que te interesen según su estado actual.</li>
    <li><strong>Acceder al detalle</strong> completo de cada operación utilizando el botón "Ver Ticket".</li>
  </ul>`;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public paymentService: PaymentService,
    public appoitmentService: AppointmentService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
  ) {
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getInfoUser();
    this.authService.closeMenu();
  }


  getInfoUser() {
    this.userService.showPatientByNdoc(this.user.n_doc).subscribe((resp: any) => {
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

  getPatient() {
    this.cargando = true;
    this.userService.showPatientProfile(this.patient_id).subscribe((resp: any) => {
      this.cargando = false;
      this.patient_selected = resp.patient;
      this.appointments = resp.appointments;
    })
  }


  getPatientPayments() {
    this.cargando = true;
    this.paymentService.getPagosbyUser(this.patient_id).subscribe((resp: any) => {
      this.cargando = false;
      this.payments = resp.data;
    })
  }


  selectedPayment(payment: any) {
    this.paymentSelected = payment

  }

  search() { }

  clearFilters(): void {
    // Vibración y reset de filtros
    if (navigator.vibrate) navigator.vibrate(50);

    this.query = '';
    this.status = '';
    this.isFiltering = false
    this.payments;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 2. ACTIVAR EL TOAST Y PROGRAMAR CIERRE
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 2500); // Se ocultará solo después de 2.5 segundos

    this.getPatientPayments();
  }

  verDetallePago(pago: any) {
    this.pagoSeleccionado = pago;

    const el = document.getElementById('offcanvasPago');
    const bsOffcanvas = new bootstrap.Offcanvas(el);
    bsOffcanvas.show();
  }

  reportarPago(payment: any) {
    // Verificamos si el objeto tiene el ID de la factura
    const facturaId = payment.factura?._id || payment.factura;

    if (facturaId) {
      this.router.navigate(['/reportar-pago', facturaId]);
    } else {
      // Si no hay factura (pago huérfano), podrías mandarlo a una ruta general
      console.warn('Este pago no tiene una factura asociada');
      this.router.navigate(['/reportar-pago', 'nuevo']);
    }
  }


}
