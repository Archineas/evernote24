import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent {
  constructor(private authService: AuthenticationService) {}

  isLoggedIn = this.authService.isLoggedIn();
}
