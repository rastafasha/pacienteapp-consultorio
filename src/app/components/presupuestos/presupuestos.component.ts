import { Component, OnInit } from '@angular/core';
import { Presupuesto } from 'src/app/models/presupuesto';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {

  private usuario: User;
  private presupuesto: Presupuesto;
  public presupuestosList: Presupuesto[];
  presupuestoSelected = false;
  constructor(
    private presupuestoService:PresupuestoService,
    private authService:AuthService,
  ) {
    this.usuario = this.authService.user;

   }

  ngOnInit(): void {
    this.presupuestoSelected = false;
    this.listaPresupuestos();
  }

  listaPresupuestos(){
    this.presupuestoService.byPatient(this.usuario.n_doc).subscribe((resp:any)=>{
      console.log(resp);
      this.presupuestosList = resp.presupuestos.data;
    })
  }
  selectedPayment(presupuesto:any){
    this.presupuestoSelected = presupuesto
    
  }
  back(){
    this.presupuestoSelected = null;
  }
}
