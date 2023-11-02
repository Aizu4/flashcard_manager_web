import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DeckService} from "../../../services/deck.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mini-deck',
  templateUrl: './mini_deck.component.html',
  styleUrls: ['./mini_deck.component.scss']
})
export class MiniDeckComponent {
  @Input() deck: any;

  @Output() deleted: EventEmitter<string> = new EventEmitter();

  editMode: boolean = false;
  newName: string = ""

  constructor(private deckService: DeckService, private router: Router) {
  }

  delete() {
    if (!confirm("Do you want to delete this mini_deck?")) return;
    this.deckService.deleteDeck(this.deck.id).subscribe(() => {
      this.deleted.emit(this.deck.id)
    })
  }

  enableEditMode() {
    this.editMode = true;
    this.newName = this.deck.name
  }

  disableEditMode() {
    this.editMode = false;
    this.deckService.patchDeck(this.deck.id, {name: this.newName}).subscribe(deck => {
      this.deck = deck
    })
  }

  changePublic($event: Event) {
    alert($event)
  }

  goToDeckPage() {
    this.router.navigate(['/mini_deck/' + this.deck.id]).then()
  }
}
