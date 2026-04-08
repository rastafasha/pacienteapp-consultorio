import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, delay } from 'rxjs';
import { Patient, User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signosvitales',
  templateUrl: './signosvitales.component.html',
  styleUrls: ['./signosvitales.component.css']
})
export class SignosvitalesComponent implements OnInit {
  // public cargando: boolean = true;
  @Input() patient:Patient;
  @Input() usuario:User;

  user:any;
  patient_id:number;
  appointments:any;
  num_appointment:any;
  money_of_appointments:any;
  num_appointment_pendings:any;
  appointment_pendings:any;
  temperature: number; // Declare temperature as a number
  patient_selected:any=[];
  
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
    this.patient_selected = this.patient;

    if (this.patient_selected) {
        this.temperature = this.patient_selected.temperature; // Initialize temperature from patient object
    } else {
        console.error('Patient data is undefined');
    }
    // console.log('usuario',this.usuario);
    // console.log(this.patient);

    
  }
  
  
 

}
