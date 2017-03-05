import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { DataService } from '../data.service';
import { LoginComponent } from './login.component';

const loginRoutes: Routes = [
   { path: 'login', component: LoginComponent, data: { title: 'Login | Lead Time'} }
];

@NgModule({
   imports: [
      RouterModule.forChild(loginRoutes)
   ],
   exports: [
      RouterModule
   ],
   providers: [
      AuthGuard,
      DataService
   ]
})
export class LoginRoutingModule {}
