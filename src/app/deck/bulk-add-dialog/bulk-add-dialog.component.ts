import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-bulk-add-dialog',
  templateUrl: './bulk-add-dialog.component.html',
  styleUrls: ['./bulk-add-dialog.component.scss'],
})
export class BulkAddDialogComponent {
  text: any;
  constructor(public dialogRef: MatDialogRef<BulkAddDialogComponent>) {
  }
}
