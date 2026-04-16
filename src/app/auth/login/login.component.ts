import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
declare const gapi: any;


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent implements OnInit {
  email = new FormControl();
  password = new FormControl();
  n_doc = new FormControl();
  remember = new FormControl();

  loginForm: FormGroup;
  submitted = false;
  isLoading = false;
  returnUrl: string;
  loginError: string;
  error = null;

  public auth2: any;

  user: User;

  // Registro
  public formSumitted = false;
  public registerForm;
  // Registro

  errors: any = null;
  public currentStep: number = 1;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,

  ) {

  }
  username: FormControl<any>;
  ngOnInit() {

    this.loginForm = this.fb.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]

    });
    this.authService.getLocalStorage();
    this.validador();

  }

  validador() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      n_doc: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      // role: ['GUEST'],
      // terminos: [false, Validators.required],
    }, {
      validators: this.passwordsIguales('password', 'password2')
    });
  }

  login() {
    this.isLoading = true;
    if (!this.loginForm) {
      return;
    }

    this.authService.login(
      this.loginForm.value.email ? this.loginForm.value.email : '',
      this.loginForm.value.password ? this.loginForm.value.password : ''

    ).subscribe(
      (resp: any) => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
          // document.location.reload();

        } else {
          localStorage.removeItem('email');
        }
        this.authService.getLocalStorage();
        this.isLoading = false;
        if (localStorage.getItem('user')) {
          setTimeout(() => {
            this.router.navigateByUrl('/app');
          }, 500)

        }

      }, (error) => {
        Swal.fire('Error', error.error, 'error');
        this.errors = error.error;
      }
    )
    // console.log(this.user)
  }

  nextStep() {
    const name = this.registerForm.get('name');
    const surname = this.registerForm.get('surname');
    const n_doc = this.registerForm.get('n_doc');

    if (name?.invalid || surname?.invalid || n_doc?.invalid) {
      name?.markAsTouched();
      surname?.markAsTouched();
      n_doc?.markAsTouched();
      return;
    }
    this.currentStep = 2;
  }

  prevStep() {
    this.currentStep = 1;
  }


  // Registro
  crearUsuario() {
    this.isLoading = true; // Cámbialo a true al empezar
    this.formSumitted = true;

    this.authService.crearUsuario(this.registerForm.value).subscribe(
      resp => {
        this.isLoading = false;
        Swal.fire('¡Registrado!', 'Cuenta vinculada con éxito. Ya puedes ingresar.', 'success');
        this.router.navigateByUrl('/login'); // Es mejor redirigir al login
      },
      (error) => {
        this.isLoading = false;

        // Si el error es porque el paciente no existe en el consultorio
        let mensajeError = "No se pudo completar el registro";

        if (error.status === 404) {
          mensajeError = "No encontramos tu registro en el consultorio. Por favor, contacta a tu médico.";
        } else if (error.error && typeof error.error === 'object') {
          // Si son errores de validación (email duplicado, etc)
          mensajeError = Object.values(error.error).join(" / ");
        }

        Swal.fire('Error', mensajeError, 'error');
        this.errors = error.error;
      }
    );
  }


  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSumitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSumitted;
  }

  passwordNoValido() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ((pass1 !== pass2) && this.formSumitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }
  // Registro



}
