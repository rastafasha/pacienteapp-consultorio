import { Component, OnInit } from '@angular/core';
import { of, delay } from 'rxjs';
import { PublicidadService } from 'src/app/services/publicidad.service';

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.css']
})
export class PublicidadComponent implements OnInit {

  public cargando: boolean = true;

  pubs:any;
  
  constructor(
    public publicidadService:PublicidadService
  ) { }

  ngOnInit(): void {
    this.publicidadService.listPublicidadActivos().subscribe((resp:any)=>{
      // console.log(resp);
      this.pubs = resp.pubs.data;
    })
  }
  

}
