import { Component, OnInit, Optional } from '@angular/core';
import { DataService } from '../data.service';
import { SortCardsPipe } from '../sort-cards.pipe';
import { NotificationService } from '../notification/notification.service';

@Component({
   selector: 'carga',
   templateUrl: './carga.component.html',
   styleUrls: ['./carga.component.scss']
})
export class CargaComponent implements OnInit {
   private cargasViagem: Array<any> = [];
   private cargasAguardando: Array<any> = [];
   public cargas: any;
   private expanded: boolean = false;
   private filtro: any = {};
   public loading: boolean = true;
   public showFilter: boolean = false;
   private empty = true;
   public ordenacao : string = "['+carga_previsao_inicio']";
   private selected : string = 'viagem';

   private pagination_inf: number;
   private pagination_sup: number;
   private pagination_amount: number;
   private page: string;
   private asc_desc: string;
   private ascending: boolean;
   private order_by: string;
   private orders: string[];
   private orderIndex: number;

   constructor(private dataService: DataService, private notificationService: NotificationService) { }

   ngOnInit() {
      this.filtro.orders_label = ["Realizada", "Prevista", "Tempo atraso"];
      this.filtro.orders = ["realizada", "prevista", "tempo_atraso"];
      this.filtro.orderIndex = 0;
      this.filtro.order_by = this.filtro.orders[this.filtro.orderIndex];

      this.filtro.ascending = true;
      this.setAscDesc();

      this.filtro.pagination_inf = 0;
      this.filtro.pagination_sup = 10;
      this.filtro.pagination_amount = 10;

      this.filtro.page = "carga";

      this.loadCargasViagem(true);
      this.filtro.previsto = true;
      this.filtro.atrasado = true;
   }

   loadCargasViagem(force?: boolean) {
      this.loading = true;
      this.empty = true;
      this.dataService.loadCargasViagem(force, this.filtro).then(data => {
        this.loading = false;
        console.log(data);
         if (data.viagens) {
            this.cargasViagem = this.cargasViagem.concat(data.viagens);
            this.empty = false;
         } else {
           this.notificationService.title = 'Algo deu errado';
           this.notificationService.code = data.detail.error;
           this.notificationService.message = data.message;
           this.notificationService.stacktrace = data.detail.stacktrace;
           this.notificationService.open('load-error');
         }
      });
   }

   loadCargasAguardando(force?: boolean) {
      this.loading = true;
      this.empty = true;
      this.dataService.loadCargasAguardando(force).then(data => {
         if (data.viagens) {
            this.cargasAguardando = this.cargasAguardando.concat(data.viagens);
            this.empty = false;
         }
         this.loading = false;
      });
   }

   expand() {
      this.expanded = !this.expanded;
      for(let i = 0; i < this.cargasViagem.length; i++) {
         this.cargasViagem[i].details = this.expanded;
      }
      for(let i = 0; i < this.cargasAguardando.length; i++) {
         this.cargasAguardando[i].details = this.expanded;
      }
   }

   statusFilter(status: String, dataArray: any) {
      if (status === 'atrasado') {
         this.filtro.atrasado = !this.filtro.atrasado;
      } else if (status === 'previsto') {
         this.filtro.previsto = !this.filtro.previsto;
      }
      this.search(dataArray);
   }

   search(dataArray: any) {
      let hasOne : boolean = false;
      for(let i = 0; i < dataArray.length; i++) {
         if ((dataArray[i].status === 'ATRASADO' && this.filtro.atrasado && this.filtro.atrasado === true)
         || (dataArray[i].status === 'PREVISTO' && this.filtro.previsto && this.filtro.previsto === true)) {
            dataArray[i].visible = true;
         } else {
            dataArray[i].visible = false;
         }

         if (this.filtro.valor) {
            let temp = this.filtro.valor.toLowerCase();
            if (this.filtro.placa && dataArray[i].placa && (dataArray[i].placa[0].placa.toLowerCase().indexOf(temp) >= 0)
            || this.filtro.num_romaneio && dataArray[i].num_romaneio && (dataArray[i].num_romaneio.toLowerCase().indexOf(temp) >= 0)
            || this.filtro.origem && dataArray[i].origem && (dataArray[i].origem.toLowerCase().indexOf(temp) >= 0)
            || this.filtro.destino && dataArray[i].destino && (dataArray[i].destino.toLowerCase().indexOf(temp) >= 0)
            || this.filtro.transportadora && dataArray[i].transportadora && (dataArray[i].transportadora.toLowerCase().indexOf(temp) >= 0)
            || this.filtro.mercadoria && dataArray[i].mercadoria && this.searchMercadoria(dataArray[i].mercadoria, temp)
         ) {
            dataArray[i].visible = true;
            hasOne = true;
         } else {
            dataArray[i].visible = false;
         }
      }
   }
   this.empty = !hasOne && this.filtro.valor;
}

searchMercadoria(item: any, value: string): boolean {
   for (let i = 0; i < item.length; i++) {
      if (item[i].mercadoria && (item[i].mercadoria.toLowerCase().indexOf(value) >= 0)) {
         return true;
      }
   }
   return false;
}

loadData(tabIndex: number) {
   if (tabIndex === 0) {
      this.loadCargasViagem(false);
   } else {
      this.loadCargasAguardando(false);
   }
}

loadMore() {
   this.filtro.pagination_inf += this.filtro.pagination_amount;
   this.filtro.pagination_sup += this.filtro.pagination_amount;

   if (this.page === 'carga') {
      this.loadCargasViagem(true);
   } else {
      this.loadCargasAguardando(true);
   }
}

sort() {
   this.filtro.orderIndex++;
   if (this.filtro.orderIndex >= this.filtro.orders.length) {
      this.filtro.orderIndex = 0;
   }
   this.filtro.order_by = this.filtro.orders_label[this.filtro.orderIndex];
}

setAscDesc() {
   this.filtro.ascending = !this.filtro.ascending;
   this.filtro.asc_desc = this.filtro.ascending === true ? 'asc' : 'desc';
}

tab(menu : string) {
   this.selected = menu;
}
}
