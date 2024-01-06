import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DeckService} from "../../services/deck.service";
import {CardService} from "../../services/card.service";
import {CardTableComponent} from "./card-table/card-table.component";
import {MatDialog} from "@angular/material/dialog";
import {BulkAddDialogComponent} from "./bulk-add-dialog/bulk-add-dialog.component";


@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent {
  @ViewChild(CardTableComponent) cardTable: any;
  deck: any;
  focusedCard: any;
  search: string = '';
  bulkText: string = '';

  constructor(private deckService: DeckService, private route: ActivatedRoute, private cardService: CardService, private router: Router, public dialog: MatDialog) {
    this.route.params.subscribe(params => {
      deckService.getDeck(params['id']).subscribe({
        next: deck => {
          this.deck = deck;
        }, error: () => {
          this.router.navigate(['/not_found'], {skipLocationChange: true}).then()
        }
      })
    });
  }

  newCard() {
    this.cardService.createCard(this.deck.id, {}).subscribe(card => {
      this.deck.card_set.push(card)
      this.cardTable.dataSource.data = this.deck.card_set;
      this.focusedCard = card;
      this.cardTable.table.renderRows()
    })
  }

  pasteCard() {
    let text = prompt("Paste card JSON here: ");
    if (!text) return;
    this.cardService.createCard(this.deck.id, JSON.parse(text)).subscribe(card => {
      this.deck.card_set.push(card)
      this.cardTable.dataSource.data = this.deck.card_set;
      this.cardTable.table.renderRows()
    })
  }

  deleteCard(card: any) {
    this.focusedCard = null;
    this.deck.card_set = this.deck.card_set.filter((v: { id: any; }) => v.id !== card.id)
    this.cardTable.dataSource.data = this.deck.card_set;
    this.cardTable.table.renderRows()
  }

  updateCard(card: any) {
    let i = this.deck.card_set.findIndex((v: { id: any; }) => v.id === card.id)
    if (i === -1) return;
    this.deck.card_set[i] = card;
    this.cardTable.dataSource.data = this.deck.card_set;
    this.cardTable.table.renderRows()
  }

  filter() {
    this.cardTable.dataSource.filter = this.search.trim().toLowerCase();
    this.cardTable.table.renderRows()
  }

  clearFilter(event: any) {
    this.search = '';
    this.cardTable.dataSource.filter = '';
    (event.target as HTMLInputElement).blur();
    this.cardTable.table.renderRows()
  }

  openBulkInputDialog() {
    const dialogRef = this.dialog.open(BulkAddDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.cardService.createCardsFromText(this.deck.id, result).subscribe(cards => {
        this.deck.card_set = this.deck.card_set.concat(cards)
        this.cardTable.dataSource.data = this.deck.card_set;
        this.cardTable.table.renderRows()
      }
    )});
  }
}

