import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent {
   @ViewChild(SidenavComponent)
   private sideNav: SidenavComponent;

   private title: String = 'AppComponent';
}
