import { Component, OnInit } from '@angular/core';
import { of, delay } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  specialities:any;
  loading:boolean;
  obs$ = of(1).pipe(delay(500));

  constructor(
    public appointmentService:AppointmentService
  ) { }

  ngOnInit(): void {
    this.appointmentService.listConfig().subscribe((resp:any)=>{
      
      this.specialities = resp.specialities;
    })
  }
  

}
