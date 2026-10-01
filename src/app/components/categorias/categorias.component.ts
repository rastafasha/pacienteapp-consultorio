import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { of, delay } from 'rxjs';
import { AppointmentService } from '../../services/appointment.service';
declare var bootstrap: any;
@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.component.html',
    styleUrls: ['./categorias.component.css'],
    standalone: false
})
export class CategoriasComponent implements OnInit {
   // 🔥 El cable emisor hacia el Padre
  @Output() alSeleccionarEspecialidad = new EventEmitter<string>();
  
  specialities:any;
  cargando:boolean;
  obs$ = of(1).pipe(delay(500));
  especialidadId:any = null;

  constructor(
    public appointmentService:AppointmentService
  ) { }

  ngOnInit(): void {
    this.cargando = true
    this.appointmentService.listConfig().subscribe((resp:any)=>{
      
      this.specialities = resp.specialities;
       this.cargando = false
    })
  }

   abrirDetalle(especialidadId: string) {
    console.log("📢 Categorías emitiendo ID hacia el Home:", especialidadId);
    this.alSeleccionarEspecialidad.emit(especialidadId);

   
  }

  // Reemplaza o añade este método en tu archivo ts
seleccionarEspecialidad(id: any) {
  // 1. Guardamos localmente para encender la clase .active en el HTML
  this.especialidadId = id;
  
  console.log("📢 Categorías emitiendo ID hacia el Home:", id);
  
  // 2. Despachamos el ID hacia el componente Padre (Home)
  this.alSeleccionarEspecialidad.emit(id);
}

  

}
