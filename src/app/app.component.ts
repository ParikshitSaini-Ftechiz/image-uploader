import { Component, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private toastr: ToastrService) { }

  @HostListener('window:online', ['$event'])
  handleOnline(event: Event) {
    this.toastr.success('You are online!');
  }

  @HostListener('window:offline', ['$event'])
  handleOffline(event: Event) {
    this.toastr.error('You are offline!');
  }
}
