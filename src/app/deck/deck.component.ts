import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DeckService} from "../../services/deck.service";
import {CardService} from "../../services/card.service";


@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent {
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
    })
  }
}

