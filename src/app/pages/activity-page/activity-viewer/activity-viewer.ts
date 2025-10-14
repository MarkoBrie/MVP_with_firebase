import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../../../services/activity-service';

@Component({
  selector: 'app-activity-viewer',
  imports: [],
  templateUrl: './activity-viewer.html',
  standalone: true
})
export class ActivityViewer {
  private route = inject(ActivatedRoute);
  private activityService = inject(ActivityService);

  activity = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? this.activityService.get(id) : undefined;
  });

  host(url: string) { try { return new URL(url).host.replace(/^www\./,''); } catch { return url; } }
  maps(p: any) { return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.address || p.name)}`; }

}
