import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivityService } from '../../services/activity-service';


@Component({
  selector: 'activity-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./activity-page.html" 
})
export class ActivityPage {

  activityService = inject(ActivityService)
  
  activities: any[] = [];
  
  constructor() {}

  //angular method called when a component is initialised
  ngOnInit(){
    this.activities = this.activityService.list()
  }
}