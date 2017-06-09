import { Injectable, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { KMMGateway } from './kmm/gateway';
import { Usuario } from './kmm/usuario';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

   protected user: Usuario = Usuario.getInstance();

   public cargasDestinado: Array<any> = [];
   public cargasAguardando: Array<any> = [];
   public descargasDestinado: Array<any> = [];
   public descargasAguardando: Array<any> = [];
   public indicadores: Array<any> = [];
   public mercadoriaCliente: Array<any> = [];
   public mercadoriaLeadTime: Array<any> = [];
   public transitTime: any = null;
   public indicadoresHome: any = null;


   public isLoggedIn: boolean = false;
   public redirectUrl: string;

   public firstLoad: boolean = false;
   public _modulo: string = "LEADTIME";

   constructor(public http: Http, private gateway: KMMGateway ) {
   }

   login(parameters?: any): Promise<boolean> {
      this.isLoggedIn = false;
      return this.gateway.backendCall(this._modulo, "LOGON", parameters, false).then(
         (result) => {
            if (result.token) {
               this.isLoggedIn = true;
               this.user.setToken(result.token);
            }
            return this.isLoggedIn;
         }
      );
   }

   logout(): void {
      this.isLoggedIn = false;
   }

   loadIndicadores(force?: boolean, parameters?: string): Promise<any> {
      if (this.indicadores == null || force) {
         return this.gateway.backendCall(this._modulo, "getIndicadores", parameters, false).then(
            (result) => {
               this.indicadores = result;
               return this.indicadores;
            }
         );
      } else {
         return Promise.resolve(this.indicadores);
      }
   }

   loadViagens(tab: string, force: boolean, parameters?: string): Promise<any> {
      if (this.cargasDestinado == null || this.cargasAguardando == null || this.descargasDestinado == null || this.descargasAguardando == null || force) {
         return this.gateway.backendCall(this._modulo, "getViagem", parameters, false).then(
            (result) => {
               if (tab === 'carga_destinado') {
                  this.cargasDestinado = result;
               } else if (tab === 'carga_aguardando') {
                  this.cargasAguardando = result;
               } else if (tab === 'descarga_destinado') {
                  this.descargasDestinado = result;
               } else if (tab === 'descarga_aguardando') {
                  this.descargasAguardando = result;
               }
               return result;
            }
         );
      } else {
         if (tab === 'carga_destinado') {
            return Promise.resolve(this.cargasDestinado);
         } else if (tab === 'carga_aguardando') {
            return Promise.resolve(this.cargasAguardando);
         } else if (tab === 'descarga_destinado') {
            return Promise.resolve(this.descargasDestinado);
         } else if (tab === 'descarga_aguardando') {
            return Promise.resolve(this.descargasAguardando);
         }
      }
   }

   /*
   * INICIO DO BLOCO DE TRANSIT TIME
   */
   loadTransitTime(force?: boolean): Promise<any> {

      if (this.transitTime == null || force) {
         return new Promise(resolve => {
            this.http.get('http://private-8d09d-leadtime.apiary-mock.com/transit/transitTime')
            .map(res => res.json())
            .subscribe(data => {
               this.transitTime = data;
               resolve(this.transitTime);
            }, err => {
               console.error(err);
            });
         });
      } else {
         return Promise.resolve(this.transitTime);
      }
   }
   /*
   * FIM DO BLOCO DE TRANSIT TIME
   */

   loadDadosHome(force?: boolean): Promise<any> {

      if (this.indicadoresHome == null || force) {
         return new Promise(resolve => {
            this.http.get('http://private-8d09d-leadtime.apiary-mock.com/home/indicadores')
            .map(res => res.json())
            .subscribe(data => {
               this.indicadoresHome = data;
               //console.log(this.indicadoresHome);
               resolve(this.indicadoresHome);
            }, err => {
               console.error(err);
            });
         });
      } else {
         return Promise.resolve(this.indicadoresHome);
      }
   }


   loadMercadoriaCliente(force?: boolean, parameters?: string): Promise<any> {
      // if (this.mercadoriaCliente == null || force) {
      //    return this.gateway.backendCall(this._modulo, "getMercadoriaMap", parameters, false).then(
      //       (result) => {
      //          this.mercadoriaCliente = result;
      //          console.log(this.mercadoriaCliente);
      //          return this.mercadoriaCliente;
      //       }
      //    );
      // } else {
      return Promise.resolve({"NOME":[{"mercadoria_de_para_id": 1, "mercadoria_api": "Mercadoria2", "mercadoria_id":1},{"mercadoria_de_para_id": 2, "mercadoria_api": "Mercadoria1", "mercadoria_id":2}]});
      //return Promise.resolve(this.mercadoriaCliente);
      // }
   }

   loadMercadoriaLeadTime(force?: boolean, parameters?: string): Promise<any> {
      // if (this.mercadoriaLeadTime == null || force) {
      //    return this.gateway.backendCall(this._modulo, "getMercadoria", parameters, false).then(
      //       (result) => {
      //          this.mercadoriaLeadTime = result;
      //          console.log(this.mercadoriaLeadTime);
      //          return this.mercadoriaLeadTime;
      //       }
      //    );
      // } else {
      return Promise.resolve({"mercadoria":[{"mercadoria_id": 1, "natureza_id": 1, "mercadoria":"Teste1"},{"mercadoria_id": 2, "natureza_id": 1, "mercadoria":"Teste2"}]});
      //return Promise.resolve(this.mercadoriaLeadTime);
      // }
   }
}
