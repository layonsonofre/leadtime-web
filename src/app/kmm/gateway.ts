import { Component, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Usuario } from './usuario';

@Injectable()
export class KMMGateway {
   protected user: Usuario = Usuario.instance;
   //private loading: Loading;

   public _base: string = 's02b24';
   public url: string = 'http://' + this._base + '.kmm.com.br/modulos/leadtime/api/gateway.php';

   constructor(private _http: Http/*, private loadingCtrl: LoadingController, private alertCtrl: AlertController*/) {
      this.user.token = 'eyJpYXQiOjE0ODUyNTUyNjMsImp0aSI6Ik16WXdNakEwT0E9PSIsImlzcyI6InMwMmIyNC5rbW0uY29tLmJyIiwibmJmIjoxNDg1MjU1MjY4LCJleHAiOjE1MDA4MDcyNjgsImRhdGEiOnsiYWNlc3NvIjoibGVhZHRpbWUiLCJzZW5oYSI6IjEyMzQ1NiJ9fQ==.ZGM0NTMwOGRhNTM2ODAyYTMyOGU2MWVlNzM0NDliMzM2MmMyNTJiOGIyYWMxODU5ZmViYWViZWViMGMyMjk0NQ==';
   }

   public setLoading(flag: boolean, loadingText?: string): Promise<any> {
      /*if (flag) {
      this.loading = this.loadingCtrl.create({
      content: loadingText
   });
   return this.loading.present(this.loading);
} else {
if (this.loading != null && this.loading.isLoaded()) {
return this.loading.dismiss();
} else {
return Promise.resolve({});
}
}*/
return Promise.resolve({});
}

public isLoading(): boolean {
   return false;
}

public backendCall(module: string, operation: string, parameters?: any, showLoading?: boolean): Promise<any> {
   //if (this.user.url == null || this.user.url == "") {
   //   this.user.url = location.protocol + "//" + location.host;
   //}
   //this.url = this.user.url + "_remote/gateway.php";

   showLoading = showLoading == null ? true : showLoading;
   let loadingText: string = "";

   let headers: Headers = new Headers();
   if (parameters == null) {
      parameters = {};
   }

   let requestData: any = {
      module: module,
      operation: operation,
      parameters: parameters
   };

   headers.append("Content-Type", "application/json");
   if (this.user.token) {
      headers.append("Authorization", "Bearer " + this.user.token);
   } else {
      headers.append("Token-Time-Hours", (180 * 24) + ""); // 180 dias
   }
   if (this.user.isDebug) {
      headers.append("Debug", "1");
   }
   headers.append("KMM-Platform", "Web");

   return new Promise((resolvePai, rejectPai) => {
      this.setLoading(showLoading, loadingText).then(() => {
         this.send(this.url, requestData, headers).then((data: any) => {
            this.setLoading(false).then(() => {
               data = data.json(); // Observable.map não estava funcionando...
               if (data.result != null) {
                  resolvePai(data.result);
               } else {
                  resolvePai(data);
               }
            });
         }).catch((dataError: any) => {
            this.setLoading(false).then(data => {
               dataError = dataError.json();
               let errorM = "Erro não identificado. Entre em contato com o suporte.";
               if (dataError.status == 401) {// Não autorizado - Quando o token é inválido ou expirado
                  errorM = "Autenticação expirada. Faça novamente o login.";
                  this.user.logout();
                  // Se não tiver na tela inicial ou splash, voltar pro login
               } else if (dataError.status == 403) {
                  this.user.logout();
                  // Se não tiver na tela inicial ou splash, voltar pro login
               } else {
                  try {
                     errorM = dataError.message;
                  } catch (er) {
                     if (this.user.isDebug) {
                        errorM = JSON.stringify(dataError);
                     }
                  }
                  /*let alert = this.alertCtrl.create({
                  title: "Erro",
                  message: errorM,
                  buttons: [
                  {
                  text: "OK",
                  handler: () => {
                  alert.dismiss().then(() => {
                  if (rejectPai != null) {
                  rejectPai(dataError); // Chama o reject do promise de retorno
               }
            });
         }
      }
   ]
});
alert.present(alert);*/
//alert(errorM);
}
});
});
});
});;
}

private send(url: string, requestData: any, headers: Headers): Promise<any> {
   return new Promise((resolve, reject) => {
      this._http.post(url, JSON.stringify(requestData), { headers: headers }).subscribe(data => resolve(data), err => reject(err));
   })
}
}
