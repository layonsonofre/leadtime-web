import { Component, OnInit, Input } from '@angular/core';
import { ViagensComponent } from '../../viagens/viagens.component';

@Component({
   selector: 'descargas-destinado',
   templateUrl: '../../viagens/viagens.component.html'
})
export class DescargasDestinadoComponent extends ViagensComponent {

   @Input()
   page = 'descarga';

   @Input()
   aba = 'destinado';
}
