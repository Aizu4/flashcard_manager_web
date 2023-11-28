import {Component, Input} from '@angular/core';
import {DeckService} from "../../../../services/deck.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-deck-csv-export',
  templateUrl: './deck-csv-export.component.html',
  styleUrls: ['./deck-csv-export.component.scss']
})
export class DeckCsvExportComponent {
  @Input() deck: any;

  // @ts-ignore
  csvSettingsForm: FormGroup;

  separatorValues = [
    ['Comma (,)', ','],
    ['Semicolon (;)', ';'],
    ['Tab (\\t)', '\t'],
    ['Pipe (|)', '|']
  ];

  quotecharValues = [
    ['Double quote (")', '"'],
    ['Single quote (\')', '\''],
    ['Backtick (`)', '`']
  ];

  constructor(private deckService: DeckService, private formBuilder: FormBuilder) {
    this.initDeckForm();
  }

  initDeckForm() {
    this.csvSettingsForm = this.formBuilder.group({
      separator: [';'],
      quotechar: ['"'],
    });
  }

  downloadDeck() {
    this.deckService.exportDeckToCSV(this.deck.id, this.csvSettingsForm.getRawValue()).subscribe((data) => {
        let blob = new Blob([data], {type: 'text/csv'});
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = this.deck.name + '.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      }
    )
  }
}
