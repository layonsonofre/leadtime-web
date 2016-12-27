import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { DialogService } from './dialog.service';
import { DataService } from './data.service';

import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { CargaComponent } from './carga/carga.component';

@NgModule({
   declarations: [
      SidenavComponent,
      AppComponent,
      LoginComponent,
      HomeComponent,
      CargaComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      MaterialModule.forRoot(),
      LoginRoutingModule,
      AppRoutingModule
   ],
   providers: [
      DialogService,
      DataService
   ],
   bootstrap: [ AppComponent ]
})
export class AppModule { }
