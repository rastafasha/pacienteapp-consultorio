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
  @Input() usuario: any;
  @Input() patient: any;

  user: any;
  public settings: any;
  public setting_selectedId: any;
  public avatar_setting: any;
  public name_setting: any;

  // 🚀 LA SOLUCIÓN: Definimos el canal observable que se conectará con el HTML
  public unreadCount$!: Observable<number>;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public configService: ConfigService,
    public notifService: NotificacionService, // 🟢 Inyectado de forma pública
    private router: Router
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

  /**
   * 🚀 LIMPIEZA ASÍNCRONA: Al ir al buzón de alertas del paciente,
   * disparamos el PUT al backend de Node y reseteamos el BehaviorSubject a 0
   */
  navegarANotificaciones() {
    this.notifService.marcarComoLeidas().subscribe({
      next: () => {
        console.log('🧹 Contador reactivo vaciado en MongoDB Atlas con éxito.');
        this.router.navigate(['/app/mis-notificaciones']);
      },
      error: (err) => {
        console.error('Aviso: Navegando con bypass por retraso de red:', err);
        this.router.navigate(['/app/mis-notificaciones']);
      }
    });
  }

  getInfoUser() {
    if (this.user && this.user.n_doc) {
      this.userService.showPatientByNdoc(this.user.n_doc).subscribe((resp: any) => {
        if (resp && resp.patient && resp.patient.data) {
          this.patient = resp.patient.data[0];
        }
      });
    }
  }

  getSettings() {
    this.configService.getAllSettings().subscribe((resp: any) => {
      if (resp && resp.settings && resp.settings.data && resp.settings.data[0]) {
        this.settings = resp.settings.data;
        this.setting_selectedId = resp.settings.data[0].id;
        this.avatar_setting = resp.settings.data[0].avatar;
        this.name_setting = resp.settings.data[0].name;
      }
    });
  }

  openMenu() {
    const menuLateral = document.getElementsByClassName("sidemenu ");
    for (let i = 0; i < menuLateral.length; i++) {
      menuLateral[i].classList.add("active");
    }
  }

  closeMenu() {
    this.authService.closeMenu();
  }

  logout() {
    this.authService.logout();
  }

  darkMode(dark: string) {
    const element = document.body;
    const classExists = document.getElementsByClassName('darkmode').length > 0;
    const dayNight = document.getElementsByClassName("site");

    for (let i = 0; i < dayNight.length; i++) {
      element.classList.toggle("darkmode");
    }

    if (classExists) {
      localStorage.removeItem('darkmode');
    } else {
      localStorage.setItem('darkmode', dark);
    }
  }
}
