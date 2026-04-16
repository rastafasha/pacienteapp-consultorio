import { Component, OnInit } from '@angular/core';
import { PublicidadService } from '../../services/publicidad.service';

@Component({
    selector: 'app-publicidad',
    templateUrl: './publicidad.component.html',
    styleUrls: ['./publicidad.component.css'],
    standalone: false
})
export class PublicidadComponent implements OnInit {

  public cargando: boolean = true;

  pubs:any;
  
  constructor(
    public publicidadService:PublicidadService
  ) { }

  ngOnInit(): void {
    this.cargando = true;
    this.publicidadService.listPublicidadActivos().subscribe((resp:any)=>{
      // console.log(resp);
      this.pubs = resp.pubs.data;
       this.cargando = false;
    })
  }
  

}
