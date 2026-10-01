import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cita-card',
  standalone:false,
  templateUrl: './cita-card.component.html',
  styleUrl: './cita-card.component.css'
})
export class CitaCardComponent {

  // 📥 Recibe el objeto individual de la cita (satisface cualquier pestaña)
  @Input() appointment: any;

}
