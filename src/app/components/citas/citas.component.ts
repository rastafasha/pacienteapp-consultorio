import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express-serve-static-core';
import { of, delay } from 'rxjs';
import { Patient, User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  // public cargando: boolean = true;
  @Input() usuario:User;
  @Input() patient:Patient;
  
  user:any;
  patient_id:number;
  patient_data:any = [];
  appointments:any;
  num_appointment:any;
  money_of_appointments:any;
  num_appointment_pendings:any;
  appointment_pendings:any;

  constructor(
    public authService:AuthService,
   
    public userService:UserService,
    public activatedRoute:ActivatedRoute,
  ) { 
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.authService.getLocalStorage();
    this.authService.closeMenu();
    this.usuario;

    this.patient;
    
    
  }
  

}
