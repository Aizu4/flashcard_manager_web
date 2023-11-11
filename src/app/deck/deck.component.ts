import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DeckService} from "../../services/deck.service";
import {CardService} from "../../services/card.service";
import {CardTableComponent} from "./card-table/card-table.component";


@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent {
  @ViewChild(CardTableComponent) cardTable: any;
  deck: any;
  focusedCard: any;

  constructor(private deckService: DeckService, private route: ActivatedRoute, private cardService: CardService) {
    this.route.params.subscribe(params => {
      deckService.getDeck(params['id']).subscribe(deck => {
        this.deck = deck;
      })
    });
  }

  newCard() {
    this.cardService.createCard(this.deck.id, {}).subscribe(card => {
      this.deck.card_set.push(card)
      this.focusedCard = card;
      this.cardTable.table.renderRows()
    })
  }

  pasteCard() {
    let text = prompt("Paste card JSON here: ");
    if (!text) return;
    this.cardService.createCard(this.deck.id, JSON.parse(text)).subscribe(card => {
      this.deck.card_set.push(card)
    })
  }

  deleteCard(card: any) {
    this.focusedCard = null;
    this.deck.card_set.deleteById(card.id)
    this.cardTable.table.renderRows()
  }
}

