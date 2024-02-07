import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DeckService} from "../../../../services/deck.service";

@Component({
  selector: 'app-deck-csv-import',
  templateUrl: './deck-csv-import.component.html',
  styleUrls: ['./deck-csv-import.component.scss']
})
export class DeckCsvImportComponent {
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
  src: any | null = null;

  constructor(private deckService: DeckService, private formBuilder: FormBuilder) {
    this.initDeckForm();
  }

  initDeckForm() {
    this.csvSettingsForm = this.formBuilder.group({
      separator: [';'],
      quotechar: ['"'],
    });
  }

  processCSV(csvInput: any) {
    const file: File = csvInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.src = event.target.result;
    });

    reader.readAsText(file);
  }

  importCards() {
    this.deckService.importDeckFromCSV(this.deck.id, this.csvSettingsForm.value, this.src).subscribe({next: () => {
      location.reload();
    }, error: () => {
      this.src = null;
      alert('The CSV file could not be imported. Please check the file and try again.');
      }});
  }
}
