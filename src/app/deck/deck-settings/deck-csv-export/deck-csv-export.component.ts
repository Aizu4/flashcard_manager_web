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
      with_images: [true],
      with_tags: [true],
    });
  }

  downloadData(data: any, type: string, filename: string) {
    let blob = new Blob([data], {type: type});
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  downloadDeck() {
    this.deckService.exportDeckToCSV(this.deck.id, this.csvSettingsForm.getRawValue()).subscribe((data) => {
        this.downloadData(data, 'text/csv', `${this.deck.name}_${Date.now()}.csv`);
      }
    )
  }

  downloadImages() {
    this.deckService.exportDeckImages(this.deck.id).subscribe((data) => {
        this.downloadData(data, 'application/zip', `${this.deck.name}_${Date.now()}.zip`);
      }
    )
  }
}
