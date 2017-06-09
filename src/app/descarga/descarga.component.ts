import { Component, OnInit } from '@angular/core';
import { DescargasDestinadoComponent } from '../descarga/destinado/descargas-destinado.component';
import { DescargasAguardandoComponent } from '../descarga/aguardando/descargas-aguardando.component';

@Component({
   selector: 'descarga',
   templateUrl: './descarga.component.html'
})
export class DescargaComponent implements OnInit {
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
