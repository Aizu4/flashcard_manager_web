import {Component, OnInit} from '@angular/core';
import {DeckService} from "../../services/deck.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private deckService: DeckService) {
  }

  decks: any[] | undefined | null = undefined

  ngOnInit() {
    this.initDecks();
  }

  private initDecks() {
    this.deckService.getDeckList().subscribe({
      next: (v) => {
        this.decks = v
      }, error: () => {
        this.decks = null
      }
    });
  }

  deleteById($event: string) {
    this.decks = this.decks?.filter(v => v.id !== $event)
  }

  createDeck() {
    let name = prompt("Put in the name") ?? "unnamed"
    this.deckService.createDeck(name).subscribe((deck) => {
      this.decks?.push(deck)
    });
  }
}
