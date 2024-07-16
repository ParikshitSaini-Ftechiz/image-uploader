import { Component } from '@angular/core';
import { IndexedDbService } from '../indexed-db.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  images: { title: string, file: File, url: string }[] = [];

  constructor(private indexedDbService: IndexedDbService, private toastr: ToastrService) { }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    const title = prompt('Enter image title:');

    if (file && title) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        this.images.push({ title, file, url });
        this.indexedDbService.addImage(title, file, url).then(() => {
          this.toastr.success('Image uploaded successfully!');
        });
      };
      reader.readAsDataURL(file);
    }
  }
}