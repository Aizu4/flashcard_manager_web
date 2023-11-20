import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DeckService} from "../../../services/deck.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LanguageService} from "../../../services/language.service";
import {TagService} from "../../../services/tag.service";

@Component({
  selector: 'app-deck-settings',
  templateUrl: './deck-settings.component.html',
  styleUrls: ['./deck-settings.component.scss']
})
export class DeckSettingsComponent implements OnInit, OnChanges {
  @Input() deck: any;

  // @ts-ignore
  deckForm: FormGroup;
  newTag: string = '';

  constructor(private deckService: DeckService, private formBuilder: FormBuilder, public languageService: LanguageService, private tagService: TagService) {
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

  addTag() {
    if (!this.newTag) return;
    if (this.deck.tags.map((tag: any) => tag.text).includes(this.newTag)) return;
    this.tagService.createTag(this.deck.id, {text: this.newTag}).subscribe((tag) => {
      this.deck.tags.push(tag);
      this.newTag = '';
    });
  }

  removeTag(tag: any) {
    if (!confirm(`Do you want to remove the tag: "${tag.text}"?`)) return;
    this.tagService.deleteTag(this.deck.id, tag.id).subscribe(() => {
      this.deck.tags = this.deck.tags.filter((t: any) => t.id !== tag.id);
    });
  }
}
