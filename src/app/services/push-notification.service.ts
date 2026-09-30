import { inject, Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const claveVapidApi = environment.VAPI_KEY_PUBLIC;
const urlBackend = environment.urlBackedNotification;

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  readonly VAPID_PUBLIC_KEY = claveVapidApi;

  private swPush = inject(SwPush);
  private http = inject(HttpClient);
  public toastr = inject(ToastrService);
  public router = inject(Router);
  // Este observable le dirá a cualquier componente si el usuario está suscrito
  public isSubscribed$ = new BehaviorSubject<boolean>(false);
  public isProcessing$ = new BehaviorSubject<boolean>(false);


  constructor() {
    this.checkSubscriptionStatus();
    this.checkInitialStatus();
  }
  async checkInitialStatus() {
    // Verificamos si el navegador ya tiene una suscripción activa
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    this.isSubscribed$.next(!!sub);
  }
  setSubscriptionStatus(status: boolean) {
    this.isSubscribed$.next(status);
  }
  async checkSubscriptionStatus() {
    // 1. Esperamos a que el Service Worker esté listo
    const reg = await navigator.serviceWorker.ready;
    // 2. Buscamos si ya hay una suscripción
    const sub = await reg.pushManager.getSubscription();
    // 3. Si hay suscripción, avisamos a la App
    this.isSubscribed$.next(!!sub);
  }

      subscribeToNotifications() {
    this.isProcessing$.next(true);
    
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      // 1. Extraemos el objeto usuario del localStorage del Paciente de forma segura
      const userString = localStorage.getItem('user');
      const userObj = userString ? JSON.parse(userString) : null;
      // Extraemos el ID físico del Paciente logueado
      const currentUid = userObj && userObj.id ? userObj.id.toString() : 'GUEST';
      const miToken = localStorage.getItem('token') || '';

      // 🚀 APORTACIÓN ANTIMISTERIOS: Convertimos la suscripción a JSON plano
      const subJson = sub.toJSON();

      // 2. CONFIGURAMOS EL PAYLOAD REAL: Metemos el userId directo en el JSON
      const payloadBody = {
        endpoint: subJson.endpoint,
        expirationTime: subJson.expirationTime,
        keys: subJson.keys, // Totalmente compatible y libre de errores de tipado ts(2353)
        userId: currentUid 
      };

      // 3. Forzamos los headers de red para blindar el canal con Node
      const headers = {
        'x-token': miToken,
        'x-uid': currentUid,
        'X-Tenant-Slug': localStorage.getItem('tenant-slug') || 'default'
      };
      
      console.log('📡 [PWA PACIENTE] Despachando payload hacia Node para el ID:', currentUid);

      // 4. HACER EL POST AL BACKEND DE RENDER
      // Nota: Asegúrate de usar la variable urlBackend o la que corresponda a tu endpoint de notipush
      this.http.post(urlBackend, payloadBody, { headers }).subscribe({
        next: () => {
          console.log('✅ ¡Suscripción de paciente guardada con éxito en MongoDB!');
          this.isSubscribed$.next(true);
          this.isProcessing$.next(false);
          this.toastr.success('¡Notificaciones activadas con éxito!');

          // =========================================================================
          // 🚀 GLOBO NATIVO DE PACIENTES COORDINADO (Salta solo si se guardó en BD)
          // =========================================================================
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then((registration) => {
              const opcionesNotificacion: any = {
                body: 'A partir de ahora recibirás aquí las confirmaciones en tiempo real de tus citas médicas y presupuestos.',
                icon: 'assets/icons/72.png', // Ruta de tus iconos reales de pacienteapp
                badge: 'assets/icons/72.png',
                vibrate:[200, 100, 200],
                tag: 'bienvenida-pwa-klyntic'
              };

              registration.showNotification('🔔 ¡Canal Klyntic Conectado!', opcionesNotificacion);
            }).catch(swErr => console.log('Aviso: Service Worker no listo para el globo inmediato:', swErr));
          }
          // =========================================================================
        },
        error: err => {
          console.error('❌ Error al guardar la suscripción del paciente en Render:', err);
          this.isSubscribed$.next(false);
          this.isProcessing$.next(false);
          this.toastr.error('Error', 'No se pudo registrar el dispositivo de alertas');
        }
      });
    })
    .catch(err => {
      console.error('❌ Permiso denegado por el usuario o error VAPID:', err);
      this.isSubscribed$.next(false);
      this.isProcessing$.next(false);
      this.toastr.error('No se pudieron activar las alertas porque denegaste el permiso.', 'Aviso');
    });
  }



 


 




}
