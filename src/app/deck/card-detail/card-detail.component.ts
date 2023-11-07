import {Component, Input} from '@angular/core';
import {CardService} from "../../../services/card.service";

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent{
  @Input() card: any;

  constructor(private cardService: CardService) {
  }
  updateCard() {
    this.cardService.patchCard(this.card.id, this.card).subscribe(card => {
      this.card = card;
    })
  }

  deleteCard() {
    if (!confirm("Are you sure you want to delete this card?")) return;
    this.cardService.deleteCard(this.card.id).subscribe(() => {
      this.card = null;
    })
  }

  copyToClipboard() {
    let { front, back, example, notes } = this.card
    navigator.clipboard.writeText(JSON.stringify({front, back, example, notes})).then()
  }

  humanReadableDate(date: string) {
    return new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString()
  }
}
