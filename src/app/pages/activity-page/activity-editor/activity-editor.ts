import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ActivityService } from '../../../services/activity-service';
import { Activity } from '../../../models/activity';
import { DbActivityService } from '../../../services/db-activity-service';

@Component({
  standalone: true,
  selector: 'activity-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: "./activity-editor.html"
})
export class ActivityEditor {
  private fb = inject(FormBuilder);
  private activityService = inject(DbActivityService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

    // Define the list of categories
  categories = ['Theatre', 'Museum', 'Restaurant', 'Park', 'Workshop', 'Historic Site'];

  form = this.fb.group({
    name:        ['', Validators.required],
    category:    [this.categories[0], Validators.required],
    location:    ['Paris', Validators.required],
    website:     [''],
    address:     [''],
    description: [''],
  });

  activity = signal<Activity | null>(null);

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.activityService.get(id).then(activity => {
      this.activity.set(activity)
    })
    }
  }


  save() {
    if (this.form.invalid) return;
    const formValue = this.form.value;
    const activity: Activity = {
      name: formValue.name ?? '',
      category: formValue.category ?? '',
      location: {
        name: formValue.location ?? '', 
        address: formValue.address ?? '',
        placeId: ''
      },
      website: formValue.website ?? '',
      description: formValue.description ?? ''
    };
    this.activityService.add(activity);
    this.router.navigateByUrl('/');
  }
}