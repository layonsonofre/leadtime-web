interface Config {
   showNotificacoes: boolean;
}

export class Usuario {
   private _usuario: string;
   private _senha: string;
   private _url: string;
   private _codGestao: number;
   private _identificador: string;
   private _filiais: string;
   private _token: string;
   private _isLogged: boolean;
   private _isDebug: boolean;

   private static _instance: Usuario;

   public static get instance(): Usuario {
      if (this._instance == null) {
         this._instance = new Usuario();
      }
      return this._instance;
   }

   constructor() {
      this.isDebug = false;
   }

   public get usuario(): string {
      return this._usuario;
   }

   public set usuario(value: string) {
      this._usuario = value != null ? value.toLowerCase() : value;
      this.save();
   }

   public get senha(): string {
      return this._senha;
   }

   public set senha(value: string) {
      this._senha = value;
      this.save();
   }

   public get url(): string {
      return this._url;
   }

   public set url(value: string) {
      if (value && value.length && value[value.length - 1] != "/") {
         value += "/";
      }
      this._url = value;
      this.save();
   }

   public get codGestao(): number {
      return this._codGestao;
   }

   public set codGestao(value: number) {
      this._codGestao = value;
      this.save();
   }

   public get identificador(): string {
      return this._identificador;
   }

   public set identificador(value: string) {
      this._identificador = value;
      this.save();
   }

   public get filiais(): string {
      return this._filiais;
   }

   public set filiais(value: string) {
      this._filiais = value;
      this.save();
   }

   public get token(): string {
      return this._token;
   }

   public set token(value: string) {
      this._token = value;
      this.save();
   }

   public get isDebug(): boolean {
      return this._isDebug;
   }

   public set isDebug(value: boolean) {
      this._isDebug = value;
   }

   public get isLogged(): boolean {
      return this._isLogged != null ? this._isLogged : false;
   }

   public set isLogged(value: boolean) {
      this._isLogged = value;
      this.save();
   }

   public init(): Promise<void> {
      // Busca do storage se está logado ou não
      var data = JSON.parse(localStorage.getItem("usuario"));
      if (data == null) {
         this.usuario = "";
         this.url = "";
         this.codGestao = -1;
         this.token = "";
         this.identificador = "";
         this.isLogged = false;
      } else {
         this.url = data.url;
         this._identificador = data.identificador;
         this._isLogged = data.isLogged;
         if (data.token != null) {
            try {
               let tokenData = JSON.parse(atob(data.token.split(".")[0])).data;
               this.usuario = tokenData.username;
               this.codGestao = tokenData.cod_gestao;
               this.filiais = tokenData.filiais;
               this.token = data.token;
               this.isLogged = true;
            } catch (error) {

            }
         } else {
            this._usuario = data.usuario;
            this._senha = data.senha;
            this._codGestao = data.codGestao;
            this._filiais = data.filiais;
            this._token = data.token;
            this.save();
         }
      }
      return Promise.resolve();
   }


   public save(): void {
      let data = {
         usuario: this._usuario,
         url: this._url,
         codGestao: this._codGestao,
         filiais: this._filiais,
         token: this._token,
         isLogged: this._isLogged,
         identificador: this._identificador
      };
      localStorage.setItem("usuario", JSON.stringify(data));
   }

   public logout() {
      this.codGestao = null;
      this.filiais = null;
      this.token = null;
      this.isLogged = false;
      this.identificador = null;
   }
}
