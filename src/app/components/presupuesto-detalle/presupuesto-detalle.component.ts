import { Component, Input, OnInit } from '@angular/core';
import { Medical, Presupuesto } from 'src/app/models/presupuesto';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-presupuesto-detalle',
  templateUrl: './presupuesto-detalle.component.html',
  styleUrls: ['./presupuesto-detalle.component.css']
})
export class PresupuestoDetalleComponent implements OnInit {
private usuario: User;
  @Input() presupuestoSelected: Presupuesto;
  presupuesto: Presupuesto;
  medical: Medical;
  presupuesto_id:number;
  constructor(
    private presupuestoService:PresupuestoService,
    private authService:AuthService,
  ) {
    this.usuario = this.authService.user;

   }

  ngOnInit(): void {
    this.presupuestoSelected;
    this.getPresupuesto();
  }

  getPresupuesto(){
    if (this.presupuestoSelected) {
        this.presupuestoService.byId(this.presupuestoSelected.id).subscribe((resp:any)=>{
      // console.log(resp);
      this.presupuesto = resp.presupuesto;
      if (resp.presupuesto && resp.presupuesto.medical) {
        this.medical = resp.presupuesto.medical; // Ensure medical is defined
      } else {
        console.error('Medical data is undefined');
      }
        })
    } else {
        console.error('presupuestoSelected is undefined');
    }
  }
}
