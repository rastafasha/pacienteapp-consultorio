import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  public cargando: boolean = false;
  doctor:User;
  doctor_id: number;
  constructor(
    public activatedRoute: ActivatedRoute,
    private doctorService: DoctorService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((resp:any)=>{
      // console.log(resp);
      this.doctor_id = resp.id;
      this.getDoctor()
    });
  }

  getDoctor(){
    this.cargando = true
    this.doctorService.showDoctor(this.doctor_id).subscribe((resp:any)=>{
      this.doctor = resp.user;
      this.cargando = false;
    })
  }

}
