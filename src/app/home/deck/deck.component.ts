import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DeckService} from "../../../services/deck.service";

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent {
  @Input() deck: any;

  @Output() deleted: EventEmitter<string> = new EventEmitter();

  editMode: boolean = false;
  newName: string = ""

  constructor(private deckService: DeckService) {
  }

  delete() {
    if (!confirm("Do you want to delete this deck?")) return;
    this.deckService.deleteDeck(this.deck.id).subscribe()
    this.deleted.emit(this.deck.id)
  }

  enableEditMode() {
    this.editMode = true;
    this.newName = this.deck.name
  }

  disableEditMode() {
    this.editMode = false;
    this.deck.name = this.newName
  }
}
