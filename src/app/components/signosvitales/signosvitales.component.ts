import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, delay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signosvitales',
  templateUrl: './signosvitales.component.html',
  styleUrls: ['./signosvitales.component.css']
})
export class SignosvitalesComponent implements OnInit {
  // public cargando: boolean = true;
  @Input() patient:any;
  @Input() usuario:any;

  user:any;
  patient_id:number;
  appointments:any;
  num_appointment:any;
  money_of_appointments:any;
  num_appointment_pendings:any;
  appointment_pendings:any;
  temperature: number; // Declare temperature as a number

  constructor(
    public authService:AuthService,
   
    public userService:UserService,
    public activatedRoute:ActivatedRoute,
    private router: Router,
  ) { 
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.authService.getLocalStorage();
    this.authService.closeMenu();

    if (this.patient) {
        this.temperature = this.patient.temperature; // Initialize temperature from patient object
    } else {
        console.error('Patient data is undefined');
    }
    console.log('usuario',this.usuario);
    console.log(this.patient);
    // this.getInfoUser();

    
  }
  
  

  // getInfoUser(){
  //   this.userService.showPatientByNdoc(this.user.n_doc).subscribe((resp:any)=>{
  //     this.patient = resp.patient.data[0];
  //     this.usuario = resp;
  //     if (this.patient != undefined) {
  //       this.getPatient();
  //     } else {
  //       console.error('Patient data is undefined');
  //     }
  //   })
  // }

 

}
