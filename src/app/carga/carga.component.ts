import { Component, OnInit, Optional } from '@angular/core';
import { DataService } from '../data.service';
import { SortCardsPipe } from '../sort-cards.pipe';
import { NotificationService } from '../notification/notification.service';
import * as $ from 'jquery';

@Component({
   selector: 'carga',
   templateUrl: './carga.component.html'
})
export class CargaComponent implements OnInit {
   private cargasDestinado: Array<any> = [];
   private cargasAguardando: Array<any> = [];
   private expanded: boolean = false;
   private filtro: any = {};
   private loading: boolean = true;
   private showFilter: boolean = false;
   private empty = true;
   private ordenacao: string = "['+carga_previsao_inicio']";
   private firstTabChange: boolean;

   private pagination_inf: number;
   private pagination_sup: number;
   private destinados_pagination_inf: number;
   private destinados_pagination_sup: number;
   private aguardando_pagination_inf: number;
   private aguardando_pagination_sup: number;
   private pagination_amount: number;
   private page: string;
   private aba: string;
   private asc_desc: string;
   private ascending: boolean;
   private order_by: string;
   private orders: string[];
   private orderIndex: number;

   private total_destinados: number;
   private destinados_atrasados: number;
   private destinados_previstos: number;
   private total_aguardando: number;
   private aguardando_atrasados: number;
   private aguardando_previstos: number;

   constructor(private dataService: DataService, private notificationService: NotificationService) { }

   ngOnInit() {
      this.firstTabChange = true;

      this.filtro.orders_label = ["Realizada", "Prevista", "Tempo atraso"];
      this.filtro.orders = ["realizada", "prevista", "tempo_atraso"];
      this.filtro.orderIndex = 0;
      this.filtro.order_by = this.filtro.orders[this.filtro.orderIndex];

      this.filtro.ascending = true;
      this.setAscDesc();

      this.filtro.pagination_inf = 0;
      this.filtro.pagination_sup = 10;
      this.filtro.pagination_amount = 10;
      this.aguardando_pagination_inf = this.filtro.pagination_inf;
      this.aguardando_pagination_sup = this.filtro.pagination_sup;
      this.destinados_pagination_inf = this.filtro.pagination_inf;
      this.destinados_pagination_sup = this.filtro.pagination_sup;

      this.filtro.page = "carga";
      this.filtro.aba = 'destinado';

      this.total_destinados = 0;
      this.destinados_atrasados = 0;
      this.destinados_previstos = 0;
      this.total_aguardando = 0;
      this.aguardando_atrasados = 0;
      this.aguardando_previstos = 0;

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
            if (force) {
               if (this.filtro.aba === 'destinado') {
                  this.cargasDestinado = this.cargasDestinado.concat(data.viagens);
               } else if (this.filtro.aba === 'aguardando') {
                  this.cargasAguardando = this.cargasAguardando.concat(data.viagens);
               }
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
              if (entry.page === 'destinado') {
                  this.total_destinados = entry.total_page;
                  if (entry.tipo === 'atrasado') {
                      this.destinados_atrasados = entry.total_tipo;
                  } else if (entry.tipo === 'previsto') {
                      this.destinados_previstos = entry.total_tipo;
                  }
              } else if (entry.page === 'aguardando') {
                  this.total_aguardando = entry.total_page;
                  if (entry.tipo === 'atrasado') {
                      this.aguardando_atrasados = entry.total_tipo;
                  } else if (entry.tipo === 'previsto') {
                      this.aguardando_previstos = entry.total_tipo;
                  }
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
      for(let i = 0; i < this.cargasDestinado.length; i++) {
         this.cargasDestinado[i].details = this.expanded;
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
         if (!this.filtro.valor || (dataArray[i].status === 'ATRASADO' && this.filtro.atrasado && this.filtro.atrasado === true)
              || (dataArray[i].status === 'PREVISTO' && this.filtro.previsto && this.filtro.previsto === true)) {
            dataArray[i].visible = true;
         } else {
            dataArray[i].visible = false;
         }
         if (this.filtro.valor) {
            let temp = this.filtro.valor.toLowerCase();
            if ((this.filtro.placa && dataArray[i].placa && (dataArray[i].placa[0].placa.toLowerCase().indexOf(temp) >= 0))
               || (this.filtro.num_romaneio && dataArray[i].num_romaneio && (String(dataArray[i].num_romaneio).toLowerCase().indexOf(temp) >= 0))
               || (this.filtro.origem && dataArray[i].origem && (dataArray[i].origem.toLowerCase().indexOf(temp) >= 0))
               || (this.filtro.destino && dataArray[i].destino && (dataArray[i].destino.toLowerCase().indexOf(temp) >= 0))
               || (this.filtro.transportadora && dataArray[i].transportadora && (dataArray[i].transportadora.toLowerCase().indexOf(temp) >= 0))
               || (this.filtro.mercadoria && dataArray[i].mercadoria && this.searchMercadoria(dataArray[i].mercadoria, temp))
            ) {
               dataArray[i].visible = true;
               hasOne = true;
            } else {
               dataArray[i].visible = false;
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
      if (this.filtro.aba === 'destinado') {
         if (increase) {
            this.destinados_pagination_inf += this.filtro.pagination_amount;
            this.destinados_pagination_sup += this.filtro.pagination_amount;
         } else {
            this.destinados_pagination_inf -= this.filtro.pagination_amount;
            this.destinados_pagination_sup -= this.filtro.pagination_amount;
         }
         this.filtro.pagination_inf = this.destinados_pagination_inf;
         this.filtro.pagination_sup = this.destinados_pagination_sup;
      } else if (this.filtro.aba === 'aguardando') {
         if (increase) {
            this.aguardando_pagination_inf += this.filtro.pagination_amount;
            this.aguardando_pagination_sup += this.filtro.pagination_amount;
         } else {
            this.aguardando_pagination_inf -= this.filtro.pagination_amount;
            this.aguardando_pagination_sup -= this.filtro.pagination_amount;
         }
         this.filtro.pagination_inf = this.aguardando_pagination_inf;
         this.filtro.pagination_sup = this.aguardando_pagination_sup;
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

   tab(menu: string) {
      if (this.filtro.aba != menu) {
         this.filtro.aba = menu;
         if (this.firstTabChange) {
             this.filtro.pagination_inf = 0;
             this.filtro.pagination_sup = 10;
         }
         this.loadViagens(this.firstTabChange);
         this.firstTabChange = false;
      }
   }
}
