import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DeckService} from "../../../services/deck.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-deck-settings',
  templateUrl: './deck-settings.component.html',
  styleUrls: ['./deck-settings.component.scss']
})
export class DeckSettingsComponent implements OnInit, OnChanges {
  @Input() deck: any;

  // @ts-ignore
  deckForm: FormGroup;

  constructor(private deckService: DeckService, private formBuilder: FormBuilder, public languageService: LanguageService) {
  }

  ngOnInit() {
    this.initDeckForm()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initDeckForm()
  }

  initDeckForm() {
    this.deckForm = this.formBuilder.group(this.deck);
  }

  updateDeck() {
    this.deckService.patchDeck(this.deck.id, this.deckForm.getRawValue()).subscribe(
      () => {
        window.location.reload();
      }
    )
  }

  deleteEmptyCards() {
    if (!confirm('Are you sure you want to delete all empty cards? ' +
      '(if the card has not empty example sentences it will still be deleted)')) return;
    this.deckService.deleteEmptyCards(this.deck.id).subscribe(() => {
      window.location.reload();
    })
  }

  updateSlug() {
    let newSlug = prompt("Enter new deck code");
    if (!newSlug) return;

    this.deckService.updateDeckSlug(this.deck.id, newSlug).subscribe({
      next: () => {
        window.location.reload();
      },
      error: () => {
        alert("A deck with this code already exists.");
      }
    })
  }

  changeVisibility() {
    if (!confirm(`Are you sure you want to make the deck ${
      this.deck.public ? 'private' : 'public'
    }?`)) return;

    this.deckService.patchDeck(this.deck.id, {public: !this.deck.public}).subscribe(() => {
      window.location.reload();
    })
  }
}
