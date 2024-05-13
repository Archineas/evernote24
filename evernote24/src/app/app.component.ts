import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EvernotelistListComponent } from './evernotelist-list/evernotelist-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EvernotelistListComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'evernote24';
}
