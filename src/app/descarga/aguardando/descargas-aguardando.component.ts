import { Component, OnInit, Input } from '@angular/core';
import { ViagensComponent } from '../../viagens/viagens.component';

@Component({
   selector: 'descargas-aguardando',
   templateUrl: '../../viagens/viagens.component.html'
})
export class DescargasAguardandoComponent extends ViagensComponent {

   @Input()
   page = 'descarga';

   @Input()
   aba = 'aguardando';
}
