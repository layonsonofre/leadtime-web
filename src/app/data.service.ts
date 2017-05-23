import { Injectable, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { KMMGateway } from './kmm/gateway';
import { Usuario } from './kmm/usuario';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

   protected user: Usuario = Usuario.getInstance();

   public cargasViagem: any = null;
   public cargasAguardando: any = null;
   public descargasPrevisao: any = null;
   public descargasTempo: any = null;
   public transitTime: any = null;
   public indicadoresHome: any = null;
   public mercadoriaCliente: any = null;
   public mercadoriaLeadTime: any = null;

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

   /*
   * INICIO DO BLOCO DE CARGA
   */
   loadCargasViagem(force?: boolean, parameters?: string): Promise<any> {
      if (this.cargasViagem == null || force) {
         return this.gateway.backendCall(this._modulo, "getViagem", parameters, false).then(
            (result) => {
               this.cargasViagem = result;
               console.log(this.cargasViagem);
               return this.cargasViagem;
            }
         );
      } else {
         return Promise.resolve(this.cargasViagem);
      }
      // if (this.cargasViagem == null || force) {
      //    return new Promise(resolve => {
      //       this.http.get('http://private-8d09d-leadtime.apiary-mock.com/cargas/viagem')
      //       .map(res => res.json())
      //       .subscribe(data => {
      //          this.cargasViagem = data[0];
      //          resolve(this.cargasViagem);
      //       }, err => {
      //          console.error(err);
      //       });
      //    });
      // } else {
      //    return Promise.resolve(this.cargasViagem);
      // }
   }

   loadCargasAguardando(force?: boolean): Promise<any> {

      if (this.cargasAguardando == null || force) {
         return new Promise(resolve => {
            this.http.get('http://private-8d09d-leadtime.apiary-mock.com/cargas/aguardando')
            .map(res => res.json())
            .subscribe(data => {
               this.cargasAguardando = data[0];
               resolve(this.cargasAguardando);
            }, err => {
               console.error(err);
            });
         });
      } else {
         return Promise.resolve(this.cargasAguardando);
      }
   }
   /*
   * FIM DO BLOCO DE CARGA
   */

   /*
   * INICIO DO BLOCO DE DESCARGA
   */
   loadDescargasPrevisao(force?: boolean): Promise<any> {
      if (this.descargasPrevisao == null || force) {
         return new Promise(resolve => {
            this.http.get('http://private-8d09d-leadtime.apiary-mock.com/descargas/previsao')
            .map(res => res.json())
            .subscribe(data => {
               this.descargasPrevisao = data;
               resolve(this.descargasPrevisao);
            }, err => {
               console.error(err);
            });
         });
      } else {
         return Promise.resolve(this.descargasPrevisao);
      }
   }

   loadDescargasTempo(force?: boolean): Promise<any> {

      if (this.descargasTempo == null || force) {
         return new Promise(resolve => {
            this.http.get('http://private-8d09d-leadtime.apiary-mock.com/descargas/tempo')
            .map(res => res.json())
            .subscribe(data => {
               this.descargasTempo = data;
               resolve(this.descargasTempo);
            }, err => {
               console.error(err);
            });
         });
      } else {
         return Promise.resolve(this.descargasTempo);
      }
   }

   /*
   * FIM DO BLOCO DE DESCARGA
   */

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
