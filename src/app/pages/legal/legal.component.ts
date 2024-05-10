import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})
export class LegalComponent implements OnInit {

  constructor(
    public authService:AuthService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.authService.closeMenu();
  }

}
