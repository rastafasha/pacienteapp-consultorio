import { Component } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pacienteapp';

  // pwa
  isOnline: boolean;
  modalVersion: boolean;
  modalPwaEvent: any;
  modalPwaPlatform: string | undefined;

  constructor(
    public toastr: ToastrService,
  ) {
    this.isOnline = false;
    this.modalVersion = false;
  }

  public ngOnInit(): void {

    window.addEventListener('online', () => {
      this.isOnline = true;
      this.toastr.success('Conexión restablecida');
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.toastr.error('Se ha perdido la conexión');
    });

  }

}
