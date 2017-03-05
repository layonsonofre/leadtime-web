import { Component, OnInit, Optional } from '@angular/core';
import { DataService } from '../data.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';

@Component({
   selector: 'carga',
   templateUrl: './carga.component.html',
   styleUrls: ['./carga.component.scss']
})
export class CargaComponent implements OnInit {
   private cargasViagem: any = [];
   private cargasAguardando: any = [];
   public cargas: any;
   private expanded: boolean = false;
   private filtro: any = {};
   public loading: boolean = true;

   private pagination_inf: number;
   private pagination_sup: number;
   private pagination_amount: number;
   private page: string;
   private asc_desc: string;
   private ascending: boolean;
   private order_by: string;
   private orders: string[];
   private orderIndex: number;

   constructor(private dataService: DataService, public dialog: MdDialog, private titleService: Title) { }

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
      this.dataService.loadCargasViagem(force, this.filtro).then(data => {
         if (data.viagens) {
            this.cargasViagem = this.cargasViagem.concat(data.viagens);
         }
         this.loading = false;
      });
   }

   loadCargasAguardando(force?: boolean) {
      this.loading = true;
      this.dataService.loadCargasAguardando(force).then(data => {
         if (data.viagens) {
            this.cargasAguardando = this.cargasAguardando.concat(data.viagens);
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
      for(let i = 0; i < dataArray.length; i++) {
         if ((dataArray[i].status === 'ATRASADO' && this.filtro.atrasado && this.filtro.atrasado === true)
         || (dataArray[i].status === 'PREVISTO' && this.filtro.previsto && this.filtro.previsto === true)) {
            dataArray[i].visible = true;
         } else {
            dataArray[i].visible = false;
         }

         if (this.filtro.valor) {
            let temp = this.filtro.toLowerCase();
            if (this.filtro.placa && dataArray[i].placa && temp === dataArray[i].placa.toLowerCase()
            || this.filtro.num_romaneio && dataArray[i].num_romaneio && temp === dataArray[i].num_romaneio.toLowerCase()
            || this.filtro.origem && dataArray[i].origem && temp === dataArray[i].origem.toLowerCase()
            || this.filtro.destino && dataArray[i].destino && temp === dataArray[i].destino.toLowerCase()
            || this.filtro.transportadora && dataArray[i].transportadora && temp === dataArray[i].transportadora.toLowerCase()
            || this.filtro.mercadoria && dataArray[i].mercadorias && this.searchItems(dataArray[i].mercadorias, 'mercadoria', temp)
            ) {
               dataArray[i].visible = true;
            } else {
               dataArray[i].visible = false;
            }
         }
      }
   }

   searchItems(item: any, attribute: string, value: string): boolean {
      if (item.mercadorias) {
          for (let i = 0; i < item.length; i++) {
             // TODO: get attribute name and compare with 'attribute' parameters
              if (value === item[i].mercadoria.toLowerCase()) {
                  return true;
              }
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

   onScroll(event: any, tabIndex: number) {
      if (event.srcElement.scrollTop > (event.srcElement.scrollHeight - event.srcElement.scrollHeight/3)) {
         this.filtro.pagination_inf += this.filtro.pagination_amount;
         this.filtro.pagination_sup += this.filtro.pagination_amount;

         if (tabIndex === 0) {
            this.loadCargasViagem(true);
         } else {
            this.loadCargasAguardando(true);
         }
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
}
