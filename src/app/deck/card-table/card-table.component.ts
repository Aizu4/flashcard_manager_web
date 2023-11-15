import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import ISO6391 from 'iso-639-1'

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.scss']
})
export class CardTableComponent{
  @Input() deck: any;

  @ViewChild(MatTable) table: MatTable<any> | undefined;

  @Output() cardClicked = new EventEmitter<any>();

  selectedRow: any;

  constructor() {
  }

  selectRow(row: any) {
    this.selectedRow = row;
    this.cardClicked.emit(row);
  }

  isSelected(row: any) {
    if (!this.selectedRow) {
      return false;
    }
    return this.selectedRow === row;
  }

  languageName(code: string) {
    return ISO6391.getName(code)
  }
}
