import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  year: number = new Date().getFullYear();
  user:any;
  patient:any = [];
  usuario:any = [];
  public settings:any;
  public setting_selectedId:any;
  public avatar_setting:any;
  public name_setting:any;

  constructor(
    public authService:AuthService,
    public userService:UserService,
    public configService:ConfigService,
    private router: Router,
    
  ) {
    this.user = this.authService.user;
   }

  ngOnInit(): void {
    
    this.authService.getLocalStorage();
    this.getInfoUser()
    this.getSettings()
    this.authService.getLocalDarkMode();
  }

  getInfoUser(){
    this.userService.showPatientByNdoc(this.user.n_doc).subscribe((resp:any)=>{
      // console.log('todo',resp);
      this.patient = resp.patient.data[0];
      // console.log('patient', this.patient);
      this.user = resp.user.data[0];
      // console.log('user', this.user);
      // console.log('patient', this.patient);
      // this.usuario = resp;
    })
  }

  getSettings(){
    this.configService.getAllSettings().subscribe((resp:any)=>{
      // console.log(resp);
      this.settings= resp.settings.data;
      this.setting_selectedId= resp.settings.data[0].id;
      this.avatar_setting= resp.settings.data[0].avatar;
      this.name_setting= resp.settings.data[0].name;
    })
}

  openMenu(){
    var menuLateral = document.getElementsByClassName("sidemenu ");
    for (var i = 0; i<menuLateral.length; i++) {
       menuLateral[i].classList.add("active");

    }
  }
  closeMenu(){
    this.authService.closeMenu();
  }

  logout(){
    this.authService.logout();
  }

  darkMode(dark:string){
    var element = document.body;

    const classExists = document.getElementsByClassName(
      'darkmode'
     ).length > 0;

    var dayNight = document.getElementsByClassName("site");
      for (var i = 0; i<dayNight.length; i++) {
        // dayNight[i].classList.toggle("darkmode");
        element.classList.toggle("darkmode");

      }
      // localStorage.setItem('dark', dark);

      if (classExists) {
        localStorage.removeItem('darkmode');
        // console.log('✅ class exists on page, removido');
      } else {
        localStorage.setItem('darkmode', dark);
        // console.log('⛔️ class does NOT exist on page, agregado');
      }
      // console.log('Pulsado');
  }
}
