import {Component, Input} from '@angular/core';
import {DeckService} from "../../../services/deck.service";

@Component({
  selector: 'app-deck-settings',
  templateUrl: './deck-settings.component.html',
  styleUrls: ['./deck-settings.component.scss']
})
export class DeckSettingsComponent {
  @Input() deck: any;
  languageOptions: any[] = [
    'English', 'Polish', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Japanese', 'Korean', 'Chinese', 'Other'
  ];

  constructor(private deckService: DeckService) {
  }

  updateDeck() {
    this.deckService.patchDeck(this.deck.id, this.deck).subscribe()
  }
}
