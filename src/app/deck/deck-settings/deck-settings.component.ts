import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DeckService} from "../../../services/deck.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-deck-settings',
  templateUrl: './deck-settings.component.html',
  styleUrls: ['./deck-settings.component.scss']
})
export class DeckSettingsComponent implements OnInit, OnChanges {
  @Input() deck: any;
  languageOptions: any[] = [
    'English', 'Polish', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Japanese', 'Korean', 'Chinese', 'Other'
  ];

  // @ts-ignore
  deckForm: FormGroup;

  constructor(private deckService: DeckService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initDeckForm()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initDeckForm()
  }

  initDeckForm() {
    this.deckForm = this.formBuilder.group({
      name: this.deck.name,
      front_language: this.deck.front_language,
      back_language: this.deck.back_language,
    });
  }

  updateDeck() {
    this.deckService.patchDeck(this.deck.id, this.deckForm.getRawValue()).subscribe()
  }
}
