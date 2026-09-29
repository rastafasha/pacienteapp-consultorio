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
import { UserService } from '../../../services/user.service';
import { TasadollarbcvService } from '../../../services/tasabcv.service';
import { TasaeurobcvService } from '../../../services/tasaeurobcv.service';
import { TasapersonalizadaService } from '../../../services/tasapersonalizada.service';
import { DoctorService } from '../../../services/doctor.service';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs'
import { ClinicaService } from '../../../services/clinica.service';
import { SettignService } from '../../../services/settigs.service';

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

  public moneda: string;
  public tasadollar;
  public tasaeuro;

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
    public tasaBcvService: TasadollarbcvService,
    private tasaEuroBcvService: TasaeurobcvService,
    private tasaPersonalizadaService: TasapersonalizadaService,
    public doctorService: DoctorService,
    public toastr: ToastrService,
    private clinicaService: ClinicaService,
    private settingService: SettignService
  ) {
    this.usuario = this.authService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER : '');
    this.validarFormulario();
    this.activatedRoute.params.subscribe((resp: any) => {
      this.appointment_id = resp.id;
    });
    this.getInfoCita();
    this.getPatientInfo();
  }

  getPatientInfo() {
    this.cargando = true;
    this.userService.showPatientProfile(this.user.id).subscribe((resp: any) => {
      this.patient_selected = resp.patient;
      this.cargando = false;
    });
  }


  getInfoCita() {
    this.cargando = true;
    
    this.appoitmentService.showAppointment(this.appointment_id).subscribe((resp: any) => {
      this.appointment = resp.appointment;
      this.deuda = resp.deuda;
      this.patient_id = resp.appointment?.patient_id;
      this.doctor_id = resp.appointment?.doctor_id;

      this.PaymentRegisterForm.patchValue({
        monto: this.deuda
      });

      // Evaluamos el subdominio/Tenant de forma segura con el caché reactivo
      this.clinicaService.getClinicaDataCached().subscribe((tenantData: any) => {
        
        if (this.appointment?.clinica_id || (tenantData && tenantData.tipoClinica === 'Clinica')) {
          console.log('🏢 [Modo Clínica] Cargando cuentas institucionales...');
          const idClinicaTarget = this.appointment?.clinica_id || tenantData.id;
          
          // LLAMADA DIRECTA: Llenamos los métodos de pago de la clínica
          this.paymentMethodService.getActivoPagoByClinica(idClinicaTarget).subscribe((res: any) => {
            this.paymentMethods = res.tiposdepagos;
            this.cargando = false; 
          });
          
          this.obtenerMonedaYCalcularTasaMultiTenant(true, idClinicaTarget);

        } else {
          console.log('🟢 [Modo Consultorio] Cargando cuentas personales del médico...');
          
          // LLAMADA DIRECTA: Llenamos los métodos de pago del médico
          this.paymentMethodService.getActivoPagoByDoctor(this.doctor_id).subscribe((res: any) => {
            this.paymentMethods = res.tiposdepagos;
            this.cargando = false; 
          });
          
          this.obtenerMonedaYCalcularTasaMultiTenant(false, this.doctor_id);
        }
      });
    });
  }


  /**
   * 🏢 BIFURCACIÓN DE CONFIGURACIÓN DE CUENTAS BANCARIAS
   * Cruza la información del backend de Laravel con los datos en caché del Tenant de la URL
   */
  getTiposdePagoMultiTenant() {
    this.clinicaService.getClinicaDataCached().subscribe((tenantData: any) => {
      if (this.appointment?.clinica_id || (tenantData && tenantData.es_clinica)) {
        const idClinicaTarget = this.appointment.clinica_id || tenantData.id;
        this.paymentMethodService.getActivoPagoByClinica(idClinicaTarget).subscribe((resp: any) => {
          this.paymentMethods = resp.tiposdepagos;
          console.log(resp)
        });
      } else {
        this.paymentMethodService.getActivoPagoByDoctor(this.doctor_id).subscribe((resp: any) => {
          this.paymentMethods = resp.tiposdepagos;
        });
      }
    });
  }

  



  /**
   * 🗺️ ADAPTACIÓN DEL MOTOR DE TASAS DENTRO DEL FLUJO DEL TICKET DE PAGO
   */
 obtenerMonedaYCalcularTasaMultiTenant(isEnterprise: boolean, targetOwnerId: number) {
    let obtenerMoneda$: Observable<any>;

    if (isEnterprise) {
      // Caso Clínica: Buscamos la moneda global en los settings de Laravel
      obtenerMoneda$ = this.settingService.getAllSettings().pipe(
        switchMap((respSettings: any) => {
          const currentSetting = respSettings?.settings?.data[0];
          const monedaClinica = currentSetting ? currentSetting.moneda : 'USD';
          return of({ moneda: monedaClinica, ownerId: currentSetting?.id || targetOwnerId });
        })
      );
    } else {
      // Caso Consultorio: Buscamos la moneda configurada por el médico
      obtenerMoneda$ = this.doctorService.showDoctorMoneda(targetOwnerId).pipe(
        switchMap((respDoctor: any) => {
          return of({ moneda: respDoctor.moneda, ownerId: targetOwnerId });
        })
      );
    }

    // Ejecutamos la estrategia de tasa según la moneda resultante
    obtenerMoneda$.pipe(
      switchMap((contexto: any) => {
        this.moneda = contexto.moneda ? contexto.moneda.toUpperCase().trim() : 'USD';
        
        const estrategiasTasa: { [key: string]: () => Observable<any> } = {
          'USD': () => this.tasaBcvService.getUltimaTasa(contexto.ownerId),
          'VED': () => this.tasaBcvService.getUltimaTasa(contexto.ownerId),
          'EUR': () => this.tasaEuroBcvService.getUltimaTasa(contexto.ownerId),
          'PERSONALIZADA': () => this.tasaPersonalizadaService.getTasasByUser(contexto.ownerId)
        };

        return estrategiasTasa[this.moneda] ? estrategiasTasa[this.moneda]() : of(null);
      })
    ).subscribe({
      next: (respTasa: any) => {
        if (!respTasa) return;

        const valorTasa = this.moneda === 'PERSONALIZADA'
          ? (respTasa.tasa?.precio_dia || respTasa.precio_dia)
          : respTasa.precio_dia;

        if (this.moneda === 'USD' || this.moneda === 'VED') this.tasadollar = valorTasa;
        if (this.moneda === 'EUR') this.tasaeuro = valorTasa;
        if (this.moneda === 'PERSONALIZADA') this.tasa = valorTasa;

        this.PaymentRegisterForm.patchValue({
          tasabcv: valorTasa
        });
      },
      error: (err) => console.error("Error procesando tasas en pasarela:", err)
    });
  }

  // metodo para el cambio del select 'tipo de transferencia'

  onChangePayment(event: Event) {
    const target = event.target as HTMLSelectElement;
    const idSeleccionado = target.value;
    this.paymentSelected = this.paymentMethods.find(metodo => metodo.id === Number(idSeleccionado));

    if (this.paymentSelected) {
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
      doctor_id: [''],
      fecha: [''],
      image: [''],
      tasabcv: [''],
      moneda: [''],
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && !file.type.startsWith('image')) return;
    this.FILE_AVATAR = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.IMAGE_PREVISUALIZA = reader.result;
  }

  /**
   * 💳 ENVÍO DE FORMULARIO ACTUALIZADO
   * Inyecta de forma segura el clinica_id recuperado de la cita o del subdominio del CRM
   */
  payForm() {
    this.cargando = true;
    const formData = new FormData();

    // 🔥 CORREGIDO: Uso Seguro del operador de encadenamiento opcional (?.) para evitar quiebres
    formData.append('bank_name', this.PaymentRegisterForm.get('bank_name')?.value || '');
    formData.append('monto', this.PaymentRegisterForm.get('monto')?.value || '0');
    formData.append('referencia', this.PaymentRegisterForm.get('referencia')?.value || '');
    formData.append('status', 'PENDING');

    if (this.FILE_AVATAR) {
      formData.append('image', this.FILE_AVATAR);
    }

    formData.append('patient_id', this.patient_id);
    formData.append('doctor_id', this.appointment?.doctor?.id?.toString() || this.doctor_id);
    formData.append('appointment_id', this.appointment_id);
    formData.append('email', this.user.email);
    formData.append('nombre', this.user.name);
    formData.append('phone', this.patient_selected?.phone || '');
    formData.append('metodo', this.paymentSelected?.tipo || '');
    formData.append('fecha', Date.now().toString());

    const tasaActual = this.PaymentRegisterForm.get('tasabcv')?.value || 0;
    formData.append('tasabcv', tasaActual.toString());
    formData.append('moneda', this.moneda);

    // 🚀 ENCAPSULACIÓN ASÍNCRONA CORRECTA MULTI-TENANT
    this.clinicaService.getClinicaDataCached().subscribe((tenantData: any) => {
      if (this.appointment?.clinica_id || (tenantData && tenantData.es_clinica)) {
        const idClinica = this.appointment.clinica_id || tenantData.id;
        formData.append('clinica_id', idClinica.toString());
        formData.append('tipo_entorno', 'CLINICA');
      } else {
        formData.append('tipo_entorno', 'CONSULTORIO_INDEPENDIENTE');
      }
      this.paymentService.create(formData).subscribe({
        next: () => {
          this.toastr.success('¡Pago reportado con éxito en el sistema contable!');
          this.router.navigate(['/app/mis-pagos']);
        },
        error: (err) => {
          this.cargando = false;
          console.error(err);
          this.toastr.error('Error al registrar el pago');
        }
      });
    });
  }
  selectedTypeCoupon(value: any) {
    this.metodo = value;
  }








}

