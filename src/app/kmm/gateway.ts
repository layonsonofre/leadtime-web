import { Component, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Usuario } from './usuario';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class KMMGateway {
  protected user: Usuario = Usuario.getInstance();
  //private loading: Loading;

  public _base: string = 'sinergia2';
  public url: string = 'http://' + this._base + '.kmm.com.br/api/gateway_leadtime.php';

  constructor(private _http: Http, private notificationService: NotificationService) {
    //this.user.token = 'eyJpYXQiOjE0ODc1NTI0OTYsImp0aSI6Ik1UTTVOemd4T1E9PSIsImlzcyI6InNpbmVyZ2lhMi5rbW0uY29tLmJyIiwibmJmIjoxNDg3NTUyNTAxLCJleHAiOjE1MDMxMDQ1MDEsImRhdGEiOnsiYWNlc3NvIjoibGVhZHRpbWUiLCJzZW5oYSI6IjEyMzQ1NiJ9fQ==.MjM4MGQxMmFhMWQyYzJlYTZkMzM1OWQwYTQ4YmEzZmU2ZTc1ZjA3MGQzNWRkZGJmNzJjMWYxYmQxNWY1NTVhZQ==';
  }

  public isLoading(): boolean {
    return false;
  }

  public backendCall(module: string, operation: string, parameters?: any, showLoading?: boolean): Promise<any> {
    console.log("Operation: ", operation);
    console.log("Parameters: ", parameters);

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
    if (this.user.getToken()) {
      headers.append("Authorization", "Bearer " + this.user.getToken());
    } else {
      headers.append("Token-Time-Hours", (180 * 24) + ""); // 180 dias
    }
    if (this.user.isDebug()) {
      headers.append("Debug", "1");
    }
    headers.append("KMM-Platform", "Web");

    return new Promise((resolvePai, rejectPai) => {
      this.send(this.url, requestData, headers).then((data: any) => {
        data = JSON.parse(data._body);
        if (data.result != null) {
          resolvePai(data.result);
        } else {
          resolvePai(data);
        }
      }).catch((dataError: any) => {
        dataError = JSON.parse(dataError._body);
        let errorM = "Erro não identificado. Entre em contato com o suporte.";
        if (dataError.status == 401) {
          errorM = "Autenticação expirada. Faça novamente o login.";
          this.user.logout();
        } else if (dataError.status == 403) {
          this.user.logout();
        } else {
          try {
            errorM = dataError.message;
          } catch (er) {
            if (this.user.isDebug()) {
              errorM = JSON.stringify(dataError);
            }
          }
          this.notificationService.title = 'Erro interno';
          this.notificationService.code = dataError.code;
          this.notificationService.message = errorM;
          this.notificationService.open('login-error');
          if (resolvePai != null) {
            resolvePai(dataError);
          }
        }
      });
    });
  }

  private send(url: string, requestData: any, headers: Headers): Promise<JSON> {
    return new Promise((resolve, reject) => {
      this._http.post(url, JSON.stringify(requestData),{ headers: headers }).subscribe(data => resolve(data), err => reject(err));
    })
  }
}
