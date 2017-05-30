import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { SortCardsPipe } from '../sort-cards.pipe';

@Component({
   selector: 'app-configuracoes',
   templateUrl: './configuracoes.component.html'
})
export class ConfiguracoesComponent implements OnInit {

   private selectedTab : string = 'mercad';
   private mercadoriaCliente: Array<any> = [];
   private mercadoriaLeadTime: Array<any> = [];
   private selectMercadoria: Array<any> = [];

   private loading: boolean = true;

   constructor(private dataService: DataService) { }

   ngOnInit() {
      this.loadMercadoriaCliente(true);
      this.loadMercadoriaLeadTime(true);
   }

   tab(t : string) {
      this.selectedTab = t;
   }

   loadMercadoriaCliente(force?: boolean) {
      this.loading = true;
      this.dataService.loadMercadoriaCliente(force).then(data => {
         if (data.NOME) {
            this.mercadoriaCliente = this.mercadoriaCliente.concat(data.NOME);
         }
         this.loading = false;
      });
   }

   loadMercadoriaLeadTime(force?: boolean) {
      this.loading = true;
      this.dataService.loadMercadoriaLeadTime(force).then(data => {
         if (data.mercadoria) {
            this.mercadoriaLeadTime = this.mercadoriaLeadTime.concat(data.mercadoria);
         }
         this.loading = false;
      });
   }

}
