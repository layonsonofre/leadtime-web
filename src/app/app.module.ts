import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { KMMGateway } from './kmm/gateway';
import { DialogService } from './dialog.service';
import { DataService } from './data.service';

import { LoginRoutingModule } from './login/login-routing.module';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { CargaComponent } from './carga/carga.component';
import { FilterDialog } from './filter-dialog/filter-dialog.component';

@NgModule({
   declarations: [
      LoginComponent,
      SidenavComponent,
      AppComponent,
      HomeComponent,
      CargaComponent,
      FilterDialog
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      MaterialModule.forRoot(),
      BrowserAnimationsModule,
      LoginRoutingModule,
      AppRoutingModule
   ],
   providers: [
      DialogService,
      DataService,
      KMMGateway
   ],
   entryComponents: [
      FilterDialog
   ],
   bootstrap: [ AppComponent ]
})
export class AppModule { }
