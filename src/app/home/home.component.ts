import { Component, Optional, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
   selector: 'home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   public indicadoresHome: any;
   public title: String;

   constructor(private dataService: DataService) {
      this.title = "Dashboard";
   }

   ngOnInit() {
      this.loadData();
   }

   loadData() {
      this.dataService.loadDadosHome().then(data => {
         this.indicadoresHome = data[0].indicadores[0];
      })
   }

}
