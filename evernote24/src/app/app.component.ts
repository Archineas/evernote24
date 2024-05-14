import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EvernotelistListComponent } from './evernotelist-list/evernotelist-list.component';
import { Notelist } from './shared/notelist';
import { EvernotelistDetailComponent } from './evernotelist-detail/evernotelist-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EvernotelistListComponent, EvernotelistDetailComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'evernote24';

  listOn = true;
  detailOn = false;

  evernoteList: Notelist | undefined;

  showEvernoteList() {
    this.listOn = true;
    this.detailOn = false;
  }

  showDetails(notelist: Notelist) {
    this.evernoteList = notelist;
    this.listOn = false;
    this.detailOn = true;
  }
}
