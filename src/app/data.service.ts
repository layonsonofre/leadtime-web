import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { KMMGateway } from './kmm/gateway';
import { Usuario } from './kmm/usuario';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

   protected user: Usuario = Usuario.instance;

   public cargasViagem: any = null;
   public cargasAguardando: any = null;
   public descargasPrevisao: any = null;
   public descargasTempo: any = null;
   public transitTime: any = null;
   public indicadoresHome: any = null;

   public isLoggedIn: boolean = false;
   public redirectUrl: string;

   public firstLoad: boolean = false;
   public _modulo: string = "LEADTIME";

   constructor(public http: Http, private gateway: KMMGateway) {
   }

   login(): Promise<boolean> {
      this.isLoggedIn = false;
      return this.gateway.backendCall(this._modulo, "LOGON", null, false).then(
         (result) => {
            result.token = "eyJpYXQiOjE0ODc1NTI0OTYsImp0aSI6Ik1UTTVOemd4T1E9PSIsImlzcyI6InNpbmVyZ2lhMi5rbW0uY29tLmJyIiwibmJmIjoxNDg3NTUyNTAxLCJleHAiOjE1MDMxMDQ1MDEsImRhdGEiOnsiYWNlc3NvIjoibGVhZHRpbWUiLCJzZW5oYSI6IjEyMzQ1NiJ9fQ==.MjM4MGQxMmFhMWQyYzJlYTZkMzM1OWQwYTQ4YmEzZmU2ZTc1ZjA3MGQzNWRkZGJmNzJjMWYxYmQxNWY1NTVhZQ==";
            if (result.token) {
               this.isLoggedIn = true;
               this.user.token = result.token;
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
      // if (this.cargasViagem == null || force) {
      //    return this.gateway.backendCall(this._modulo, "getViagem", parameters, false).then(
      //       (result) => {
      //          this.cargasViagem = result;
      //          console.log(this.cargasViagem);
      //          return this.cargasViagem;
      //       }
      //    );
      // } else {
      //    return Promise.resolve(this.cargasViagem);
      // }
      if (this.cargasViagem == null || force) {
         return new Promise(resolve => {
            this.http.get('http://private-8d09d-leadtime.apiary-mock.com/cargas/viagem')
            .map(res => res.json())
            .subscribe(data => {
               this.cargasViagem = data[0];
               resolve(this.cargasViagem);
            }, err => {
               console.error(err);
            });
         });
      } else {
         return Promise.resolve(this.cargasViagem);
      }
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
}
