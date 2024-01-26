import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DeckService} from "../../services/deck.service";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import ISO6391 from "iso-639-1";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-deck-view',
  templateUrl: './deck-view.component.html',
  styleUrls: ['./deck-view.component.scss']
})
export class DeckViewComponent implements AfterViewInit {
  deck: any;
  dataSource: any;
  search: string = '';

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatTable) table: MatTable<any> | any;

  constructor(private deckService: DeckService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      deckService.getDeckBySlug(params['slug']).subscribe({
        next: deck => {
          this.deck = deck;
          this.dataSource = new MatTableDataSource(this.deck.card_set);
          this.dataSource.filterPredicate =
            (card: any, filter: string) => !filter ||
              card.front.toLowerCase().includes(filter.toLowerCase()) ||
              card.back.toLowerCase().includes(filter.toLowerCase()) ||
              card.example_front.toLowerCase().includes(filter.toLowerCase()) ||
              card.example_back.toLowerCase().includes(filter.toLowerCase()) ||
              card.tags.map((t: any) => t.name).join(', ').toLowerCase().includes(filter.toLowerCase())
        }, error: () => {
          this.router.navigate(['/not_found']).then()
        }
      })
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  formattedTags(tags: any[]) {
    return tags.map(t => t.name).join(', ')
  }

  languageName(code: string) {
    return ISO6391.getName(code)
  }

  filter() {
    this.dataSource.filter = this.search.trim().toLowerCase();
    this.table.renderRows()
  }

  clearFilter(event: any) {
    this.search = '';
    this.dataSource.filter = '';
    (event.target as HTMLInputElement).blur();
    this.table.renderRows()
  }
}
