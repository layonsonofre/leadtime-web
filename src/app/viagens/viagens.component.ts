import { Component, OnInit, Optional, Input } from '@angular/core';
import { DataService } from '../data.service';
import { SortCardsPipe } from '../sort-cards.pipe';
import { NotificationService } from '../notification/notification.service';
import { LoaderComponent } from '../loader/loader.component';
import * as $ from 'jquery';

@Component({
   selector: 'viagens',
   templateUrl: './viagens.component.html'
})
export class ViagensComponent implements OnInit {
   @Input()
   page: string;

   @Input()
   aba: string;

   private viagens: Array<any> = [];
   private expanded: boolean = false;
   private filtro: any = {};
   private loading: boolean = true;
   private showFilter: boolean = false;
   private empty = true;
   private ordenacao: string = "['+carga_previsao_inicio']";

   private asc_desc: string;
   private ascending: boolean;
   private order_by: string;
   private orders: string[];
   private orderIndex: number;

   private total: number;
   private atrasados: number;
   private previstos: number;

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

      this.filtro.page = this.page;
      this.filtro.aba = this.aba;

      this.total = 0;
      this.atrasados = 0;
      this.previstos = 0;

      this.loadViagens(true);
      this.filtro.previsto = true;
      this.filtro.atrasado = true;

   }

   loadViagens(force: boolean) {
      this.loading = true;
      this.empty = true;
      this.dataService.loadViagens(this.filtro.page + '_' + this.filtro.aba, force, this.filtro).then(data => {
         this.loading = false;
         if (data.viagens) {
            console.error(data.viagens);
            if (force) {
               this.viagens = this.viagens.concat(data.viagens);
            }
            this.empty = false;
         } else {
            this.notificationService.title = 'Algo deu errado';
            this.notificationService.code = data.detail.error;
            this.notificationService.message = data.message;
            this.notificationService.stacktrace = data.detail.stacktrace;
            this.notificationService.open('load-error');
         }
      });
      this.loadIndicadores(force);
   }

   loadIndicadores(force?: boolean) {
      this.loading = true;
      this.dataService.loadIndicadores(force, null).then(data => {
         this.loading = false;
         if (data.indicadores) {
            for (let entry of data.indicadores) {
               this.total = entry.total_page;
               if (entry.tipo === 'atrasado') {
                   this.atrasados = entry.total_tipo;
               } else if (entry.tipo === 'previsto') {
                   this.previstos = entry.total_tipo;
               }
            }
         } else {
            this.notificationService.title = 'Algo deu errado';
            this.notificationService.code = data.detail.error;
            this.notificationService.message = data.message;
            this.notificationService.stacktrace = data.detail.stacktrace;
            this.notificationService.open('load-error');
         }
      });
   }

   expand() {
      this.expanded = !this.expanded;
      for(let i = 0; i < this.viagens.length; i++) {
         this.viagens[i].details = this.expanded;
      }
   }

   statusFilter(status: String) {
      if (status === 'atrasado') {
         this.filtro.atrasado = !this.filtro.atrasado;
      } else if (status === 'previsto') {
         this.filtro.previsto = !this.filtro.previsto;
      }
      this.search();
   }

   search() {
      let hasOne : boolean = false;
      for(let i = 0; i < this.viagens.length; i++) {
         if (!this.filtro.valor || (this.viagens[i].status === 'ATRASADO' && this.filtro.atrasado && this.filtro.atrasado === true)
              || (this.viagens[i].status === 'PREVISTO' && this.filtro.previsto && this.filtro.previsto === true)) {
            this.viagens[i].visible = true;
         } else {
            this.viagens[i].visible = false;
         }
         if (this.filtro.valor) {
            let temp = this.filtro.valor.toLowerCase();
            if ((this.filtro.placa && this.viagens[i].placa && (this.viagens[i].placa[0].placa.toLowerCase().indexOf(temp) >= 0))
               || (this.filtro.num_romaneio && this.viagens[i].num_romaneio && (String(this.viagens[i].num_romaneio).toLowerCase().indexOf(temp) >= 0))
               || (this.filtro.origem && this.viagens[i].origem && (this.viagens[i].origem.toLowerCase().indexOf(temp) >= 0))
               || (this.filtro.destino && this.viagens[i].destino && (this.viagens[i].destino.toLowerCase().indexOf(temp) >= 0))
               || (this.filtro.transportadora && this.viagens[i].transportadora && (this.viagens[i].transportadora.toLowerCase().indexOf(temp) >= 0))
               || (this.filtro.mercadoria && this.viagens[i].mercadoria && this.searchMercadoria(this.viagens[i].mercadoria, temp))
            ) {
               this.viagens[i].visible = true;
               hasOne = true;
            } else {
               this.viagens[i].visible = false;
            }
         } else {
           this.filtro.placa = null;
           this.filtro.num_romaneio = null;
           this.filtro.origem = null;
           this.filtro.destino = null;
           this.filtro.transportadora = null;
           this.filtro.mercadoria = null;
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

   paginate(increase: boolean) {
      if (increase) {
         this.filtro.pagination_inf += this.filtro.pagination_amount;
         this.filtro.pagination_sup += this.filtro.pagination_amount;
      } else {
         this.filtro.pagination_inf = this.filtro.pagination_amount;
         this.filtro.pagination_sup = this.filtro.pagination_amount;
      }
   }

   loadMore() {
      this.paginate(true);
      this.loadViagens(true);
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
}
