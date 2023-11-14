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

  languages: any[] | undefined;

  constructor(private deckService: DeckService, private formBuilder: FormBuilder, public languageService: LanguageService) {
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
      front_language_code: this.deck.front_language_code,
      back_language_code: this.deck.back_language_code,
    });
  }

  updateDeck() {
    this.deckService.patchDeck(this.deck.id, this.deckForm.getRawValue()).subscribe()
  }
}
