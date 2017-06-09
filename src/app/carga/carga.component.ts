import { Component, OnInit } from '@angular/core';
import { CargasDestinadoComponent } from '../carga/destinado/cargas-destinado.component';
import { CargasAguardandoComponent } from '../carga/aguardando/cargas-aguardando.component';

@Component({
   selector: 'carga',
   templateUrl: './carga.component.html'
})
export class CargaComponent implements OnInit {
   private aba: string;

   constructor() { }

   ngOnInit() {
      this.aba = 'destinado';
   }

   tab(menu: string) {
      if (this.aba != menu) {
         this.aba = menu;
      }
   }
}
