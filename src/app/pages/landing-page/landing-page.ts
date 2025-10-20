import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. Import RouterLink

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink], // 2. Add RouterLink to imports
  standalone: true,
  templateUrl: './landing-page.html'
})
export class LandingPage {

}
