import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { KMMGateway } from './kmm/gateway';
import { NotificationService } from './notification/notification.service';
import { NotificationComponent } from './notification/notification.component';
import { DataService } from './data.service';

import { ChartsModule } from 'ng2-charts';
import { LoginRoutingModule } from './login/login-routing.module';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LoaderComponent } from './loader/loader.component';
import { ViagensComponent } from './viagens/viagens.component';
import { HomeComponent } from './home/home.component';
import { CargaComponent } from './carga/carga.component';
import { CargasDestinadoComponent } from './carga/destinado/cargas-destinado.component';
import { CargasAguardandoComponent } from './carga/aguardando/cargas-aguardando.component';
import { DescargaComponent } from './descarga/descarga.component';
import { DescargasDestinadoComponent } from './descarga/destinado/descargas-destinado.component';
import { DescargasAguardandoComponent } from './descarga/aguardando/descargas-aguardando.component';
import { SortCardsPipe } from './sort-cards.pipe';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';

@NgModule({
   declarations: [
      LoginComponent,
      SidenavComponent,
      LoaderComponent,
      ViagensComponent,
      AppComponent,
      HomeComponent,
      CargaComponent,
      CargasDestinadoComponent,
      CargasAguardandoComponent,
      DescargaComponent,
      DescargasDestinadoComponent,
      DescargasAguardandoComponent,
      SortCardsPipe,
      ConfiguracoesComponent,
      NotificationComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      LoginRoutingModule,
      ChartsModule
   ],
   providers: [
      DataService,
      NotificationService,
      KMMGateway
   ],
   entryComponents: [],
   bootstrap: [ AppComponent ]
})
export class AppModule { }
