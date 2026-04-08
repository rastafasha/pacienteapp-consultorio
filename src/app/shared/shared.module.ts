import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { PwaNotifInstallerComponent } from './pwa-notif-installer/pwa-notif-installer.component';
import { BackButtnComponent } from './backButtn/backButtn.component';
import { LoadingComponent } from './loading/loading.component';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    PwaNotifInstallerComponent,
    BackButtnComponent,
    LoadingComponent,
    SkeletonLoaderComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    PwaNotifInstallerComponent,
    BackButtnComponent,
    LoadingComponent,
    SkeletonLoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SharedModule { }
