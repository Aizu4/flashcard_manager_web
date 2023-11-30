import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CardService} from "../../../services/card.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit, OnChanges {
  @Input() card: any;
  @Input() deck: any;

  @Output() cardUpdated = new EventEmitter<any>();
  @Output() cardDeleted = new EventEmitter<any>();

  // @ts-ignore
  cardForm: FormGroup;

  constructor(private cardService: CardService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initCardForm()
  }

  ngOnChanges() {
    this.initCardForm()
  }

  initCardForm() {
    this.cardForm = this.formBuilder.group(this.card);
  }

  submitCard() {
    this.cardService.patchCard(this.card.id, this.cardForm.getRawValue()).subscribe(card => {
      this.card = card;
      this.cardUpdated.emit(this.card);
    })
  }

  deleteCard() {
    if (!confirm("Are you sure you want to delete this card?")) return;
    this.cardService.deleteCard(this.card.id).subscribe(() => {
      this.cardDeleted.emit(this.card);
      this.card = null;
    })
  }

  copyToClipboard() {
    let {front, back, example_front, example_back, notes} = this.card
    if (this.deck.example_sentences)
      navigator.clipboard.writeText(JSON.stringify({front, back, example_front, example_back, notes})).then()
    else
      navigator.clipboard.writeText(JSON.stringify({front, back, notes})).then()
  }

  humanReadableDate(date: string) {
    return new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString()
  }
}
