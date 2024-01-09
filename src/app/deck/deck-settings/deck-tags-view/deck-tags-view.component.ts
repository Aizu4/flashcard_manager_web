import {Component, Input, OnInit} from '@angular/core';
import {TagsService} from "../../../../services/tags.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-deck-tags-view',
  templateUrl: './deck-tags-view.component.html',
  styleUrls: ['./deck-tags-view.component.scss']
})
export class DeckTagsViewComponent implements OnInit {
  @Input() deck: any;

  tags: any[] = [];

  // @ts-ignore
  newTagForm: FormGroup;

  constructor(private tagsService: TagsService, private formBuilder: FormBuilder) {
    this.initTagForm();
  }

  ngOnInit() {
    this.tagsService.getDeckTags(this.deck.id).subscribe(tags => {
      this.tags = tags;
      this.sortTags();
    })
  }

  initTagForm() {
    this.newTagForm = this.formBuilder.group({
      name: [''],
    });
  }

  sortTags() {
    this.tags.sort((a, b) => a.name.localeCompare(b.name));
  }

  addTag() {
    if (!this.newTagForm.get('name')?.value) return;
    this.tagsService.addDeckTag(this.deck.id, this.newTagForm.getRawValue()).subscribe(tag => {
      this.tags.push(tag);
      this.newTagForm.reset();
      this.sortTags();
    })
  }

  removeTag(tag: any) {
    this.tagsService.deleteDeckTag(this.deck.id, tag).subscribe(() => {
      this.tags.splice(this.tags.indexOf(tag), 1);
    });
  }

  patchTag(event: [any, any]) {
    let [tag, newTag] = event;

    this.tagsService.patchDeckTag(this.deck.id, tag, newTag).subscribe(tag => {
      this.tags[this.tags.indexOf(tag)] = newTag;
      this.sortTags();
    });
  }
}
