import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { ActivityPage } from './pages/activity-page/activity-page';
import { ActivityService } from './services/activity-service';
import { NavigationBar } from './components/navigation-bar/navigation-bar';
import { FooterComponent } from './components/footer/footer';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBar, FooterComponent ],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('activity-angular-app');
  private activityService = inject(ActivityService);

  //get activites() {
  //  return this.activityService.list();
  //}
}
