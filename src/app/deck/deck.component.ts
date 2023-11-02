import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DeckService} from "../../services/deck.service";
import {CardService} from "../../services/card.service";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit, OnDestroy {
  deck: any;
  cards: any[] = [];
  private sub: any;

  @ViewChild(MatTable) table: MatTable<any> | undefined;

  displayedColumns: string[] = ['front', 'back', 'notes'];
  addCardData = {front: '', back: '', notes: ''}

  constructor(private route: ActivatedRoute, private deckService: DeckService, private cardService: CardService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.deckService.getDeck(params['id']).subscribe({
        next: deck => {
          this.deck = deck;
          this.cards = deck.card_set
        }, error: () => {
          alert('error')
        }
      })
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  createCard() {
    this.cardService.createCard(this.deck.id, this.addCardData).subscribe( card => {
      this.cards.push(card)
      this.addCardData = {front: '', back: '', notes: ''}
      this.table?.renderRows()
    })
  }
}

