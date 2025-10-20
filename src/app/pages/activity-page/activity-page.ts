import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivityService } from '../../services/activity-service';
import { Activity } from '../../models/activity';
import { DbActivityService } from '../../services/db-activity-service';

@Component({
  selector: 'activity-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./activity-page.html" 
})
export class ActivityPage {

  activityService = inject(DbActivityService)
  activites: Activity[] = [];
  
  constructor() {}

  //angular method called when a component is initialised
  ngOnInit(){
    this.activityService.list().then(activities => {
      this.activites = activities;
    })
  }


  //async ngOnInit() {
  //  this.activites = await this.activityService.list();
  //}
}