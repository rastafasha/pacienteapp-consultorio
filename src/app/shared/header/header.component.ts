import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ConfigService } from '../../services/config.service';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { NotificacionService } from '../../services/notificacion.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent implements OnInit {
  year: number = new Date().getFullYear();
  @Input() usuario:any;
  @Input() patient:any;
  
  user:any;
  public settings:any;
  public setting_selectedId:any;
  public avatar_setting:any;
  public name_setting:any;
  notificacionesPendientes=1;
  public unreadCount$!: Observable<number>;

  constructor(
    public authService:AuthService,
    public userService:UserService,
    public configService:ConfigService,
    public notifService:NotificacionService,
    private router: Router,
    
  ) {
    this.user = this.authService.user;
   }

 ngOnInit(): void {
    // 📦 1. Sincronizamos el hilo reactivo del conteo para encender el indicador rojo
    this.unreadCount$ = this.notifService.unreadCount$;

    const userString = localStorage.getItem('user');
    const userObj = userString ? JSON.parse(userString) : null;
    
    if (userObj && userObj.id) {
      // 📦 2. Consultamos de forma proactiva las alertas del pasado al iniciar
      this.notifService.cargarContadorInicial(userObj.id.toString());
    }
    
    this.authService.getLocalStorage();
    this.authService.getLocalDarkMode();
    this.getInfoUser();
    this.getSettings();
  }

  
abrirBuzon() {
    // Al hacer clic en la campana, limpiamos el contador reactivo
    this.notifService.marcarComoLeidas().subscribe();
  }
  getInfoUser(){
    this.userService.showPatientByNdoc(this.user.n_doc).subscribe((resp:any)=>{
      this.patient = resp.patient.data[0];
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


  navegarANotificaciones(){
    this.router.navigate(['/app/mis-notificaciones']);
  }
}
