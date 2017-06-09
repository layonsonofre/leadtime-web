import { Component, OnInit, Input } from '@angular/core';
import { ViagensComponent } from '../../viagens/viagens.component';

@Component({
   selector: 'cargas-destinado',
   templateUrl: '../../viagens/viagens.component.html'
})
export class CargasDestinadoComponent extends ViagensComponent {

   @Input()
   page = 'carga';

   @Input()
   aba = 'destinado';
}
