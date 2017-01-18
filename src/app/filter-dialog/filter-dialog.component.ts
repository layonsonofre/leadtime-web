import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
   selector: 'filter-dialog',
   templateUrl: './filter-dialog.component.html',
   styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialog implements OnInit {

   constructor(public dialogRef: MdDialogRef<FilterDialog>) { }

   ngOnInit() { }
}
