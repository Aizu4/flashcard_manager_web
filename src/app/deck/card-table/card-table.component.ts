import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import ISO6391 from 'iso-639-1'
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.scss']
})
export class CardTableComponent implements OnInit, AfterViewInit {
  @Input() deck: any;

  @ViewChild(MatTable) table?: MatTable<any>;
  @ViewChild(MatSort) sort?: MatSort;

  @Output() cardClicked = new EventEmitter<any>();

  dataSource: any;
  selectedRow: any;

  constructor() {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.deck.card_set);
    this.dataSource.filterPredicate =
      (card: any, filter: string) => !filter ||
        card.front.toLowerCase().includes(filter.toLowerCase()) ||
        card.back.toLowerCase().includes(filter.toLowerCase())
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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
