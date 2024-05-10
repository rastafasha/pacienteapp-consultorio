import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {

  constructor(
    public authService:AuthService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.authService.closeMenu();
  }

}
