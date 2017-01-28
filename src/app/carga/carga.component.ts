import { Component, OnInit, Optional } from '@angular/core';
import { DataService } from '../data.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FilterDialog } from '../filter-dialog/filter-dialog.component';

@Component({
   selector: 'carga',
   templateUrl: './carga.component.html',
   styleUrls: ['./carga.component.scss']
})
export class CargaComponent implements OnInit {
   private cargasViagem: any = [];
   private cargasAguardando: any = [];
   public cargas: any;
   public detailedViagem: Array<boolean> = [];
   public detailedAguardando: Array<boolean> = [];
   private expanded: boolean = false;
   private lastDialogResult: string;
   private dialogRef: MdDialogRef<FilterDialog>;

   constructor(private dataService: DataService, public dialog: MdDialog) { }

   ngOnInit() {
      this.loadCargasViagem(null, true);
   }

   loadCargasViagem(refresher, force?: boolean) {
      this.dataService.loadCargasViagem(force).then(data => {
         this.cargasViagem = data;
         for (let i = 0; i < this.cargasViagem.length; i++) {
            this.detailedViagem[i] = false;
         }
         if (refresher) {
            refresher.complete();
         }
      });
   }

   loadCargasAguardando(refresher, force?: boolean) {
      this.dataService.loadCargasAguardando(force).then(data => {
         this.cargasAguardando = data;
         for (let i = 0; i < this.cargasAguardando.length; i++) {
            this.detailedAguardando[i] = false;
         }
         if (refresher) {
            refresher.complete();
         }
      });
   }

   expand() {
      this.expanded = !this.expanded;
      for(let i = 0; i < this.detailedViagem.length; i++) {
         this.detailedViagem[i] = this.expanded;
      }
      for(let i = 0; i < this.detailedAguardando.length; i++) {
         this.detailedAguardando[i] = this.expanded;
      }
   }

   openFilter() {
    this.dialogRef = this.dialog.open(FilterDialog, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogRef = null;
    });
  }
}
