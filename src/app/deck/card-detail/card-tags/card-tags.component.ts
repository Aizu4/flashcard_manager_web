import {Component, Input, OnChanges} from '@angular/core';
import {TagsService} from "../../../../services/tags.service";
import {MatChipSelectionChange} from "@angular/material/chips";

@Component({
  selector: 'app-card-tags',
  templateUrl: './card-tags.component.html',
  styleUrls: ['./card-tags.component.scss']
})
export class CardTagsComponent implements OnChanges {
  @Input() card: any;
  @Input() deck: any;

  tags: any;
  selectedTags: any;

  constructor(private tagsService: TagsService) {

  }

  ngOnChanges() {
    this.fetchTags();
  }

  fetchTags() {
    this.tags = this.deck.tag_set;
    this.selectedTags = this.card.tags;
    this.sortTags();
  }

  isSelected(tag: any) {
    return this.selectedTags.map((t: any) => t.id).includes(tag.id);
  }

  sortTags() {
    this.tags.sort((a: any, b: any) => {
      if (this.isSelected(a) && !this.isSelected(b)) return -1;
      if (!this.isSelected(a) && this.isSelected(b)) return 1;
      return a.name.localeCompare(b.name);
    })
  }

  updateTag($event: MatChipSelectionChange, tag: any) {
    if ($event.selected) {
      this.tagsService.addCardTag(this.card.id, tag).subscribe(() => {
        this.selectedTags.push(tag);
      })
    } else {
      this.tagsService.removeCardTag(this.card.id, tag).subscribe(() => {
        this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
      })
    }
  }
}
