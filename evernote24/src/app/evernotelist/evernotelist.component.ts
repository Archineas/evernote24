import { Component, Input } from '@angular/core';
import { Notelist } from '../shared/notelist';

@Component({
  selector: 'a.app-evernotelist',
  standalone: true,
  imports: [],
  templateUrl: './evernotelist.component.html',
  styles: ``
})
export class EvernotelistComponent {
  @Input() notelist: Notelist | undefined;
}
