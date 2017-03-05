import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from '../data.service';

@Component({
   selector: 'login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent {
   message: string;

   constructor(private dataService: DataService, public router: Router) {
      this.setMessage();
   }

   setMessage() {
      this.message = 'Seu acesso ao Lead Time está ' + (this.dataService.isLoggedIn ? 'liberado' : 'expirado' + '.');
   }

   login() {
      this.message = 'Verificando acesso...';

      this.dataService.login().then(() => {
         this.setMessage();
         if (this.dataService.isLoggedIn) {
            let redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/home';

            let navigationExtras: NavigationExtras = {
               preserveQueryParams: false,
               preserveFragment: false
            };

            this.router.navigate([redirect], navigationExtras);
         }
      });
   }

   logout() {
      this.dataService.logout();
      this.setMessage();
   }
}
