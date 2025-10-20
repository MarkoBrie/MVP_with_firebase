import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../../../services/activity-service';
import { Activity } from '../../../models/activity';
import { DbActivityService } from '../../../services/db-activity-service';


@Component({
  selector: 'app-activity-viewer',
  imports: [],
  templateUrl: './activity-viewer.html',
  standalone: true
})
export class ActivityViewer {
  private route = inject(ActivatedRoute);
  private activityService = inject(DbActivityService);

  activity = signal<Activity | null>(null);

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.activityService.get(id).then(activity => {
      this.activity.set(activity)
    })
    }
  }

  host(url: string) { try { return new URL(url).host.replace(/^www\./,''); } catch { return url; } }
  maps(p: any) { return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.address || p.name)}`; }
}
