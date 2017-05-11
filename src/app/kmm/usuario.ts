interface Config {
   showNotificacoes: boolean;
}

export class Usuario {
   private acesso: string;
   private senha: string;
   private url: string;
   private cod_gestao: number;
   private identificador: string;
   private filiais: string;
   private token: string;
   private _isLogged: boolean;
   private _isDebug: boolean;

   private static instance: Usuario;

   public static getInstance(): Usuario {
      if (this.instance == null) {
         this.instance = new Usuario();
      }
      return this.instance;
   }

   constructor() {
      this._isDebug = false;
   }

   public get getAcesso(): string {
      return this.acesso;
   }

   public setAcesso(value: string) {
      this.acesso = value != null ? value.toLowerCase() : value;
      this.save();
   }

   public getSenha(): string {
      return this.senha;
   }

   public setSenha(value: string) {
      this.senha = value;
      this.save();
   }

   public getUrl(): string {
      return this.url;
   }

   public setUrl(value: string) {
      if (value && value.length && value[value.length - 1] != "/") {
         value += "/";
      }
      this.url = value;
      this.save();
   }

   public getCodGestao(): number {
      return this.cod_gestao;
   }

   public setCodGestao(value: number) {
      this.cod_gestao = value;
      this.save();
   }

   public getIdentificador(): string {
      return this.identificador;
   }

   public setIdentificador(value: string) {
      this.identificador = value;
      this.save();
   }

   public getFiliais(): string {
      return this.filiais;
   }

   public setFiliais(value: string) {
      this.filiais = value;
      this.save();
   }

   public getToken(): string {
      return this.token;
   }

   public setToken(value: string) {
      this.token = value;
      this.save();
   }

   public isDebug(): boolean {
      return this._isDebug;
   }

   public setDebug(value: boolean) {
      this._isDebug = value;
   }

   public isLogged(): boolean {
      return this._isLogged != null ? this._isLogged : false;
   }

   public setIsLogged(value: boolean) {
      this._isLogged = value;
      this.save();
   }

   public init(): Promise<void> {
      // Busca do storage se está logado ou não
      var data = JSON.parse(localStorage.getItem("usuario"));
      if (data == null) {
         this.acesso = "";
         this.url = "";
         this.cod_gestao = -1;
         this.token = "";
         this.identificador = "";
         this._isLogged = false;
      } else {
         this.url = data.url;
         this.identificador = data.identificador;
         this._isLogged = data.isLogged;
         if (data.token != null) {
            try {
               let tokenData = JSON.parse(atob(data.token.split(".")[0])).data;
               this.acesso = tokenData.username;
               this.cod_gestao = tokenData.cod_gestao;
               this.filiais = tokenData.filiais;
               this.token = data.token;
               this._isLogged = true;
            } catch (error) {

            }
         } else {
            this.acesso = data.acesso;
            this.senha = data.senha;
            this.cod_gestao = data.cod_gestao;
            this.filiais = data.filiais;
            this.token = data.token;
            this.save();
         }
      }
      return Promise.resolve();
   }


   public save(): void {
      let data = {
         acesso: this.acesso,
         url: this.url,
         cod_gestao: this.cod_gestao,
         filiais: this.filiais,
         token: this.token,
         isLogged: this._isLogged,
         identificador: this.identificador
      };
      localStorage.setItem("usuario", JSON.stringify(data));
   }

   public logout() {
      this.cod_gestao = null;
      this.filiais = null;
      this.token = null;
      this._isLogged = false;
      this.identificador = null;
   }
}
