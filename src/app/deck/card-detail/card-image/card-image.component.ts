import {Component, Input, OnChanges} from '@angular/core';
import {ImageService} from "../../../../services/image.service";

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss']
})
export class CardImageComponent implements OnChanges {
  @Input() card: any;

  src: string | null | undefined;

  constructor(private imageService: ImageService) {
  }

  ngOnChanges() {
    this.getImage();
  }

  getImage() {
    if (this.imageService.imageSrcCache.has(this.card.id)) {
      this.src = this.imageService.imageSrcCache.get(this.card.id);
      return;
    }
    this.src = undefined;
    this.imageService.getImage(this.card.id).subscribe({
      next: (image) => {
        this.src = image ? window.URL.createObjectURL(image) : null;
        this.imageService.imageSrcCache.set(this.card.id, this.src);
      },
      error: () => (this.src = null)
    })
  }

  processImage(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      let selectedFile = new ImageSnippet(event.target.result, file);
      this.imageService.uploadImage(this.card.id, selectedFile.file).subscribe((image) => {
        this.src = window.URL.createObjectURL(image);
        this.imageService.imageSrcCache.set(this.card.id, this.src);
      })
    });

    reader.readAsDataURL(file);
  }

  deleteImage() {
    if (!confirm("Are you sure you want to delete this image?")) return;
    this.imageService.deleteImage(this.card.id).subscribe(() => {
      this.src = null;
      this.imageService.imageSrcCache.delete(this.card.id);
    })
  }
}
