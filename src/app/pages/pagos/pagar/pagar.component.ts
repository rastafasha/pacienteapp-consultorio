import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { PaymentMethod } from 'src/app/models/paymentMethod';
import { User } from 'src/app/models/user';
import { PaymentMethodService } from 'src/app/services/paymentMethod.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements OnInit {
  public PaymentRegisterForm: FormGroup;
  public cargando: boolean = true;

  metodo:string;
  usuario:User;
  user:any;
  error: string;
  appointment_id: any;
  appointment: any;
  deuda: any;
  pagoSeleccionado: Payment;
  paymentMethods: PaymentMethod;
  
  patient_id: any;
  patient_selected: any;
  patient: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public appoitmentService: AppointmentService,
    private paymentService: PaymentService,
    public authService:AuthService,
    public userService:UserService,
    public paymentMethodService: PaymentMethodService
  ) { 
    this.usuario = this.authService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.validarFormulario();
    this.getTiposdepagos();
    this.activatedRoute.params.subscribe((resp:any)=>{
      // console.log(resp);
      this.appointment_id = resp.id;
      
    });
    this.getInfoCita();
    // this.getInfoUser();
  }


 
  
getInfoCita(){
  this.cargando = true;
    this.appoitmentService.showAppointment(this.appointment_id).subscribe((resp:any)=>{
      this.cargando = false;
      // console.log(resp);
      this.appointment = resp.appointment;
      this.deuda = resp.deuda;
      this.patient_id = resp.appointment.patient_id;
      
    })
  }


  validarFormulario(){
    this.PaymentRegisterForm = this.fb.group({
      id: [''],
      metodo: ['',Validators.required],
      bank_name: [''],
      monto: ['',Validators.required],
      referencia: [''],
      email: [''],
      nombre: [''],
      appointment_id: [''],
      status: ['PENDING'],
      patient_id: [''],
      fecha: [''],
      image: [''],
    })
  }
  updateForm(){

    const formData = new FormData();
    formData.append('metodo', this.PaymentRegisterForm.get('metodo').value);
    formData.append('bank_name', this.PaymentRegisterForm.get('bank_name').value);
    formData.append('monto', this.PaymentRegisterForm.get('monto').value);
    formData.append('referencia', this.PaymentRegisterForm.get('referencia').value);
    formData.append('nombre', this.PaymentRegisterForm.get('nombre').value);
    formData.append('email', this.PaymentRegisterForm.get('email').value);
    formData.append('fecha', this.PaymentRegisterForm.get('fecha').value);
    formData.append('status', 'PENDING');
    


    //crear
    const data = {
      ...this.PaymentRegisterForm.value,
      patient_id: this.patient_id,
      appointment_id: this.appointment_id,
    }
    this.paymentService.create(data)
    .subscribe( (resp: any) =>{
      this.router.navigateByUrl(`/app/mis-pagos`);
      this.pagoSeleccionado = resp;
      // console.log(this.pagoSeleccionado);
      // this.emptyCart();
    })
    return false;
  }

  selectedTypeCoupon(value:any){
    this.metodo = value;
  }

  getTiposdepagos(): void {
    // return this.planesService.carga_info();
    this.paymentMethodService.getActivas().subscribe(
      res =>{
        this.paymentMethods = res;
        error => this.error = error
        // console.log(res);
      }
    );
  }



  

}
