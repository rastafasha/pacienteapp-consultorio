import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() usuario:any;
  @Input() patient:any;
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { 
    // this.user = this.authService.user;
  }

  ngOnInit(): void {
    this.authService.getLocalStorage();
    // this.getInfoUser();
    this.usuario
    this.patient
  }

  
}
