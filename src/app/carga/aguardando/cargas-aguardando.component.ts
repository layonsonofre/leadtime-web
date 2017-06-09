import { Component, OnInit, Input } from '@angular/core';
import { ViagensComponent } from '../../viagens/viagens.component';

@Component({
   selector: 'cargas-aguardando',
   templateUrl: '../../viagens/viagens.component.html'
})
export class CargasAguardandoComponent extends ViagensComponent {

   @Input()
   page = 'carga';

   @Input()
   aba = 'aguardando';
}
