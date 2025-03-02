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
  public presupuestoSelected: Presupuesto; // Property to hold the selected presupuesto
  public presupuestosList: Presupuesto[];
  ispresupuestoSelected = false; // Keep this for UI state

  constructor(
    private presupuestoService: PresupuestoService,
    private authService: AuthService,
  ) {
    this.usuario = this.authService.user;
  }

  ngOnInit(): void {
    this.ispresupuestoSelected = false;
    this.listaPresupuestos();
  }

  listaPresupuestos() {
    if (this.usuario && this.usuario.n_doc) {
      this.presupuestoService.byPatient(this.usuario.n_doc).subscribe((resp: any) => {
        console.log(resp);
        this.presupuestosList = resp.presupuestos.data;
      });
    } else {
      console.error('User data is undefined or n_doc is missing');
    }
  }

  selectedPayment(presupuesto: Presupuesto) {
    this.presupuestoSelected = presupuesto; // Set the selected presupuesto
    this.ispresupuestoSelected = true; // Update the UI state
  }

  back() {
    this.ispresupuestoSelected = false; // Reset the UI state
    this.presupuestoSelected = null; // Clear the selected presupuesto
  }
}
