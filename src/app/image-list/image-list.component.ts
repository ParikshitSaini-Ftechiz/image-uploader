import { Component, OnInit } from '@angular/core';
import { IndexedDbService } from '../indexed-db.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {
  images: { title: string, file: File, url: string }[] = [];
  paginatedImages: { title: string, file: File, url: string }[] = [];
  pageSize = 5;
  currentPage = 0;

  constructor(private indexedDbService: IndexedDbService, private toastr: ToastrService) { }

  ngOnInit() {
    this.indexedDbService.getImages().then(images => {
      this.images = images;
      this.updatePaginatedImages();
    });
  }

  updatePaginatedImages() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedImages = this.images.slice(startIndex, endIndex);
  }

  nextPage() {
    this.currentPage++;
    this.updatePaginatedImages();
  }

  previousPage() {
    this.currentPage--;
    this.updatePaginatedImages();
  }

  deleteImage(title: string) {
    this.indexedDbService.deleteImage(title).then(() => {
      this.images = this.images.filter(image => image.title !== title);
      this.updatePaginatedImages();
      this.toastr.success('Image deleted successfully!');
    });
  }
}