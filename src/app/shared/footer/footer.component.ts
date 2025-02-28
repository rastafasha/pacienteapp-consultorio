import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  user: User;
  patient: User;
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { 
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    this.authService.getLocalStorage();
    this.getInfoUser();
  }

  getInfoUser(){
    this.userService.showPatientByNdoc(this.user.n_doc).subscribe((resp:any)=>{
      console.log(resp);
      this.patient = resp.patient.data[0];
      this.user = resp.user.data[0];
    })
  }

}
