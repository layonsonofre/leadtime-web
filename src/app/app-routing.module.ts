import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { AuthGuard } from './auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preload-strategy';

import { HomeComponent } from './home/home.component';
import { CargaComponent } from './carga/carga.component';
import { DescargaComponent } from './descarga/descarga.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { AppComponent } from './app.component';

const indexRoutes: Routes = [
   { path: '', canActivate: [AuthGuard], component: HomeComponent, data: {title: 'Início | Lead Time' } },
   { path: 'home', canActivate: [AuthGuard], component: HomeComponent, data: {title: 'Início | Lead Time' } },
   { path: 'carga', canActivate: [AuthGuard], component: CargaComponent, data: {title: 'Cargas | Lead Time'} },
   { path: 'descarga', canActivate: [AuthGuard], component: DescargaComponent, data: {title: 'Descargas | Lead Time'} },
   { path: 'config', canActivate: [AuthGuard], component: ConfiguracoesComponent, data: {title: 'Configurações | Lead Time' } }
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
