import { Component, Optional, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { DataService } from '../data.service';

@Component({
   selector: 'home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   isDarkTheme: boolean = false;
   lastDialogResult: string;
   public indicadoresHome: any;
   private title: String = 'Home';

   foods: any[] = [
      {name: 'Pizza', rating: 'Excellent'},
      {name: 'Burritos', rating: 'Great'},
      {name: 'French fries', rating: 'Pretty good'},
   ];

   progress: number = 0;
   constructor(private _dialog: MdDialog, private _snackbar: MdSnackBar, private dataService: DataService) {
      // Update the value for the progress-bar on an interval.
      setInterval(() => {
         this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
      }, 200);
   }

   openDialog() {
      let dialogRef = this._dialog.open(DialogContent);

      dialogRef.afterClosed().subscribe(result => {
         this.lastDialogResult = result;
      })
   }

   showSnackbar() {
      this._snackbar.open('YUM SNACKS', 'CHEW');
   }

   ngOnInit() {
      this.loadData();
   }

   loadData() {
      this.dataService.loadDadosHome().then(data => {
         this.indicadoresHome = data[0].indicadores[0];
         console.log(this.indicadoresHome);
      })
   }

}




@Component({
   template: `
   <p>This is a dialog</p>
   <p>
   <label>
   This is a text box inside of a dialog.
   <input #dialogInput>
   </label>
   </p>
   <p> <button md-button (click)="dialogRef.close(dialogInput.value)">CLOSE</button> </p>
   `,
})
export class DialogContent {
   constructor(@Optional() public dialogRef: MdDialogRef<DialogContent>) { }
}
