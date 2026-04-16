import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: false
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
