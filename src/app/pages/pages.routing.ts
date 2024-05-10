import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';
// import { AuthGuard } from '../guards/auth.guard';
import { ChildRoutesModule } from './child-routes.module';
import { AuthGuard } from '../guards/auth.guard';



const routes: Routes = [
    {
        path: 'app',
        component: PagesComponent,
        canActivate:[AuthGuard],
        // canLoad: [AuthGuard],
        loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule)
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


