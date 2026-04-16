import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Payment } from '../../../models/payment';
import { PaymentMethod } from '../../../models/paymentMethod';
import { User } from '../../../models/user';
import { AppointmentService } from '../../../services/appointment.service';
import { AuthService } from '../../../services/auth.service';
import { PaymentService } from '../../../services/payment.service';
import { PaymentMethodService } from '../../../services/paymentMethod.service';
import { TasabcvService } from '../../../services/tasabcv.service';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'app-pagar',
    templateUrl: './pagar.component.html',
    styleUrls: ['./pagar.component.css'],
    standalone: false
})
export class PagarComponent implements OnInit {
  public PaymentRegisterForm: FormGroup;
  public cargando: boolean = true;


  metodo: string;
  usuario: User;
  user: any;
  error: string;
  appointment_id: any;
  appointment: any;
  deuda: any;
  pagoSeleccionado: Payment;
  paymentMethods: PaymentMethod[];
  tiposdepagos: any;
  phone: any;
  image: any;
  tasa = 0;

  patient_id: any;
  patient_selected: any;
  patient: any;
  doctor_id: any;
  email: any;
  tipopago: any[];
  paymentSelected!: any;

  public FILE_AVATAR: any;
  public IMAGE_PREVISUALIZA: any;

  info = `
  <h2>Sección: Reportar Pago</h2>
  <p><strong>Nota importante:</strong> Actualmente no utilizamos pasarelas de pago directo. Cualquier actualización sobre métodos de pago automatizados será informada oportunamente a través de medios de la aplicación o correo elecrónico.</p>
  
  <p>Para reportar tu pago con éxito, sigue estas instrucciones:</p>
  <h5 class="text-center">¿Cómo hacer el pago?</h5>
   <ol>
    <li>Ingrese a la app o web del metodo de su preferencia</li>
    <li>Ingrese los datos correctamente, y verifique antes de pagar </li>
     <li>Copiar el <b>Número de Referencia</b> del pago o transferencia </li>
    <li>Dirigirse a nuestro <b>Formulario</b> y llenar los datos requeridos </li>
    </ol>

  <ul>
    <li><strong>Datos de Transferencia:</strong> Al seleccionar tu método de pago preferido, el sistema te mostrará automáticamente los datos bancarios del beneficiario para que realices la operación desde tu banca en línea.</li>
    <li><strong>Registro de Información:</strong> Completa los campos solicitados: Banco de destino y los números o códigos de la <strong>Referencia Bancaria</strong>.</li>
    <li><strong>Monto del Pago:</strong> El monto ya viene predeterminado según la cita que seleccionaste; no es necesario modificarlo.</li>
    <li><strong>Comprobante Digital (Obligatorio):</strong> Es indispensable adjuntar la imagen o captura de pantalla de tu pago. Esto nos permite validar tu reporte de manera mucho más eficiente.</li>
  </ul>`;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public appoitmentService: AppointmentService,
    private paymentService: PaymentService,
    public authService: AuthService,
    public userService: UserService,
    public paymentMethodService: PaymentMethodService,
    public tasaBcvService: TasabcvService,
    public toastr: ToastrService,
  ) {
    this.usuario = this.authService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER : '');
    this.validarFormulario();
    // this.getTiposdepagos();
    this.activatedRoute.params.subscribe((resp: any) => {
      // console.log(resp);
      this.appointment_id = resp.id;

    });
    this.getInfoCita();
    this.getTasadelDia();
    this.getPatientInfo();
  }

  getPatientInfo() {
    this.cargando = true
    this.userService.showPatientProfile(this.user.id).subscribe((resp: any) => {
      this.patient_selected = resp.patient;
      this.cargando = false
    })
  }



  getTiposdepagos(): void {
    // return this.planesService.carga_info();
    this.paymentMethodService.getActivas().subscribe(
      (res: any) => {
        this.paymentMethods = res;
        error => this.error = error
      }
    );
  }


  getInfoCita() {
    this.cargando = true;
    this.appoitmentService.showAppointment(this.appointment_id).subscribe((resp: any) => {
      this.cargando = false;
      this.appointment = resp.appointment;
      this.deuda = resp.deuda;
      this.patient_id = resp.appointment.patient_id;
      this.doctor_id = resp.appointment.doctor_id;

      this.PaymentRegisterForm.patchValue({
        monto: this.deuda
      });


      this.getTiposdePagoByDoctor();
    })
  }

  getTiposdePagoByDoctor() {
    this.paymentMethodService.getActivoPagoByDoctor(this.doctor_id).subscribe((resp: any) => {
      this.paymentMethods = resp.tiposdepagos;
    })
  }

  getTasadelDia() {
    this.tasaBcvService.getUltimaTasa().subscribe((resp: any) => {
      this.tasa = resp.precio_dia;

      this.PaymentRegisterForm.patchValue({
        tasabcv: this.tasa
      });
    })
  }

  // metodo para el cambio del select 'tipo de transferencia'

  onChangePayment(event: Event) {
    const target = event.target as HTMLSelectElement;
    const idSeleccionado = target.value;

    // Buscamos el objeto completo
    this.paymentSelected = this.paymentMethods.find(metodo => metodo.id === Number(idSeleccionado));

    if (this.paymentSelected) {
      // Seteamos automáticamente el valor en el campo 'bank_name' del formulario
      this.PaymentRegisterForm.patchValue({
        bank_name: this.paymentSelected.bankName
      });
    }
  }


  validarFormulario() {
    this.PaymentRegisterForm = this.fb.group({
      id: [''],
      metodo: ['', Validators.required],
      bank_name: [''],
      monto: ['', Validators.required],
      referencia: [''],
      email: [''],
      nombre: [''],
      phone: [''],
      appointment_id: [''],
      status: ['PENDING'],
      patient_id: [''],
      doctor_id: [this.doctor_id],
      fecha: [''],
      image: [''],
      tasabcv: [''],
    })
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && !file.type.startsWith('image')) {
      // this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    // this.text_validation = '';
    this.FILE_AVATAR = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.IMAGE_PREVISUALIZA = reader.result;
  }


  payForm() {

    const formData = new FormData();
    formData.append('bank_name', this.PaymentRegisterForm.get('bank_name').value);
    formData.append('monto', this.PaymentRegisterForm.get('monto').value);
    formData.append('referencia', this.PaymentRegisterForm.get('referencia').value);
    formData.append('status', 'PENDING');

    if (this.FILE_AVATAR) {
      formData.append('image', this.FILE_AVATAR);
    }

    
    formData.append('patient_id', this.patient_id);
    formData.append('doctor_id', this.appointment.doctor.id.toString());
    formData.append('tasabcv', this.tasa.toString());
    formData.append('appointment_id', this.appointment_id);
    formData.append('email', this.user.email);
    formData.append('nombre', this.user.name);
    formData.append('phone', this.patient_selected.phone);
    formData.append('metodo', this.paymentSelected?.tipo);
    formData.append('fecha', Date.now().toString());
    formData.append('status', 'PENDING');
    this.paymentService.create(formData).subscribe({
      next: () => {
        this.toastr.success('¡Pago reportado con éxito!');
        this.router.navigate(['/app/mis-pagos']);
      },
      error: () => {
        this.cargando = false;
        this.toastr.error('Error al registrar el pago');
      }
    });
    return false;
  }

  selectedTypeCoupon(value: any) {
    this.metodo = value;
  }







}
