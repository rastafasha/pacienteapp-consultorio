import { Component, OnInit } from '@angular/core';
import { Presupuesto } from 'src/app/models/presupuesto';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { PresupuestoService } from 'src/app/services/presupuesto.service';
declare var bootstrap: any;
@Component({
  selector: 'app-presupuestos',
  templateUrl: './presupuestos.component.html',
  styleUrls: ['./presupuestos.component.css']
})
export class PresupuestosComponent implements OnInit {
  cargando= false;
  private usuario: User;
  public presupuestoSelected: Presupuesto; // Property to hold the selected presupuesto
  public presupuestosList: Presupuesto[];
  ispresupuestoSelected = false; // Keep this for UI state

   info = `
  <h2>Sección: Presupuestos</h2>
  <ul>
    <li><strong>Historial de Presupuestos:</strong> Consulta los Presupuestos solicitados a tu medico de confianza.</li> 
    
  </ul>`;


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
    this.cargando= true;
    if (this.usuario && this.usuario.n_doc) {
      this.presupuestoService.byPatient(this.usuario.n_doc).subscribe((resp: any) => {
        this.presupuestosList = resp.presupuestos.data;
        this.cargando= false;
      });
    } 
  }

  selectedPayment(presupuesto: Presupuesto) {
    this.presupuestoSelected = presupuesto; // Set the selected presupuesto
    this.ispresupuestoSelected = true; // Update the UI state
  }

  abrirDetalle(n: any) {
    this.presupuestoSelected = n;

    // 1. Abrir Offcanvas
    const el = document.getElementById('offcanvasNotif');
    const bsOffcanvas = new bootstrap.Offcanvas(el);
    bsOffcanvas.show();

   
  }
}
