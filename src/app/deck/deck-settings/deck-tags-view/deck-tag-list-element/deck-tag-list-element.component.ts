import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-deck-tag-list-element',
  templateUrl: './deck-tag-list-element.component.html',
  styleUrls: ['./deck-tag-list-element.component.scss']
})
export class DeckTagListElementComponent {
  @Input() tag?: any;

  @Output() tagChange = new EventEmitter<[any, any]>();
  @Output() tagDelete = new EventEmitter<any>();

  editMode: boolean = false;
  newTagName: string | undefined;

  constructor() {
  }

  enableEditMode() {
    this.editMode = true;
    this.newTagName = this.tag.name;
  }

  patchTag() {
    this.editMode = false;
    this.tagChange.emit([this.tag, {name: this.newTagName}]);
    this.tag = {name: this.newTagName};
  }

  removeTag() {
    this.tagDelete.emit(this.tag);
  }
}
