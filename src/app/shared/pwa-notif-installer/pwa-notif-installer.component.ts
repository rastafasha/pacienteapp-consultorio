import { Platform } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-pwa-notif-installer',
  templateUrl: './pwa-notif-installer.component.html',
  styleUrls: ['./pwa-notif-installer.component.css']
})
export class PwaNotifInstallerComponent implements OnInit {

  // pwa
  isOnline: boolean;
  modalVersion: boolean;
  modalPwaEvent: any;
  modalPwaPlatform: string | undefined;

  constructor(
    private swUpdate: SwUpdate,
    private platform: Platform,
  ) {
    this.isOnline = false;
    this.modalVersion = false;
  }

  ngOnInit(): void {
    this.initPwa();
  }

  initPwa() {
  if (this.swUpdate.isEnabled) {
    // IMPORTANTE: Se añade el .subscribe() al final
    this.swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
    ).subscribe(evt => {
      console.info(`Versión detectada. Actual: ${evt.currentVersion} | Nueva: ${evt.latestVersion}`);
      this.modalVersion = true; // Activa tu modal
    });

    // Forzar el chequeo al cargar (útil en remoto)
    this.swUpdate.checkForUpdate().catch(err => console.error('Error buscando actualizaciones:', err));
  }

  this.loadModalPwa();
}

  private checkForUpdates() {
    this.swUpdate.checkForUpdate().then(updateFound => {
      if (updateFound) {
        console.log('Hay una actualización disponible...');
      }
    });
  }


  public updateVersion(): void {
    this.modalVersion = false;
    window.location.reload();
  }

  public closeVersion(): void {
    this.modalVersion = false;
  }

  private loadModalPwa(): void {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.modalPwaEvent = event;
        this.modalPwaPlatform = 'ANDROID';
      });
    }

    if (this.platform.IOS && this.platform.SAFARI) {
      const isInStandaloneMode = ('standalone' in window.navigator) && ((<any>window.navigator)['standalone']);
      if (!isInStandaloneMode) {
        this.modalPwaPlatform = 'IOS';
      }
    }
  }

  public addToHomeScreen(): void {
    this.modalPwaEvent.prompt();
    this.modalPwaPlatform = undefined;
  }

  public closePwa(): void {
    this.modalPwaPlatform = undefined;
  }
  // pwa

}
