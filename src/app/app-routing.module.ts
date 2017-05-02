import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { AuthGuard } from './auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preload-strategy';

import { HomeComponent } from './home/home.component';
import { CargaComponent } from './carga/carga.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { AppComponent } from './app.component';

const indexRoutes: Routes = [
   { path: '', canActivateChild: [AuthGuard], component: HomeComponent, data: {title: 'Início | Lead Time' } },
   { path: 'home', canActivateChild: [AuthGuard], component: HomeComponent, data: {title: 'Início | Lead Time' } },
   { path: 'carga', canActivateChild: [AuthGuard], component: CargaComponent, data: {title: 'Cargas | Lead Time'} },
   { path: 'config', canActivateChild: [AuthGuard], component: ConfiguracoesComponent, data: {title: 'Configurações | Lead Time' } }
];

@NgModule({
   imports: [
      RouterModule.forRoot(
         indexRoutes
         , { preloadingStrategy: SelectivePreloadingStrategy }
      )
   ],
   exports: [
      RouterModule
   ],
   providers: [
      CanDeactivateGuard,
      SelectivePreloadingStrategy
   ]
})
export class AppRoutingModule {}
