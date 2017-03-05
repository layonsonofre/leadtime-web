import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
   @ViewChild(SidenavComponent)
   private sideNav: SidenavComponent;

   private title: String;

   constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {
   }

   ngOnInit() {
      this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
         while (route.firstChild) route = route.firstChild;
         return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => {
         if (event['title']) {
            this.titleService.setTitle(event['title']);
            this.title = event['title'].substring(0, event['title'].indexOf(' | Lead Time'));
         } else {
            this.titleService.setTitle('Lead Time');
            this.title = 'Lead Time';
         }
      });
   }
}
