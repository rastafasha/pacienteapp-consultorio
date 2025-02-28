import { Component, OnInit } from '@angular/core';
import { of, delay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  loading:boolean;
  obs$ = of(1).pipe(delay(500));
  public cargando: boolean = true;
  
  option_selected:number = 1;

  user:any;
  usuario:any;
  patient:any;
  appointments:any;
  patient_id:number;
  num_appointment:any;
  money_of_appointments:any;
  num_appointment_pendings:any;
  appointment_attention:any;
  patient_selected:any;
  appointment_pendings:any;

  constructor(
    public authService:AuthService,
    public userService:UserService,
  ) { 
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.authService.closeMenu();
    this.getInfoUser();
    
  }

  getInfoUser(){
    this.cargando = true;
    this.userService.showPatientByNdoc(this.user.id).subscribe((resp:any)=>{
      this.cargando = false;
      // console.log(resp);
      this.patient = resp.patient;
      this.usuario = resp;
      this.patient_id = resp.patient.id;
    })
  }

  optionSelected(value:number){
    this.option_selected = value;
  }

}
