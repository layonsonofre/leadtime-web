import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { KMMGateway } from './kmm/gateway';
import { DialogService } from './dialog.service';
import { DataService } from './data.service';

import { ChartsModule } from 'ng2-charts';
import { LoginRoutingModule } from './login/login-routing.module';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { CargaComponent } from './carga/carga.component';
import { SortCardsPipe } from './sort-cards.pipe';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';

@NgModule({
   declarations: [
      LoginComponent,
      SidenavComponent,
      AppComponent,
      HomeComponent,
      CargaComponent,
      SortCardsPipe,
      ConfiguracoesComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      BrowserAnimationsModule,
      LoginRoutingModule,
      AppRoutingModule,
      ChartsModule
   ],
   providers: [
      DialogService,
      DataService,
      KMMGateway
   ],
   entryComponents: [],
   bootstrap: [ AppComponent ]
})
export class AppModule { }
