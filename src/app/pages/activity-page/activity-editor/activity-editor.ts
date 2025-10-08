import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ActivityService } from '../../../services/activity-service';
import { Activity } from '../../../models/activity';


@Component({
  standalone: true,
  selector: 'activity-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: "./activity-editor.html"
})
export class ActivityEditor {
  private fb = inject(FormBuilder);
  private activityService = inject(ActivityService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  activity = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? this.activityService.get(id) : undefined;
  });

  form = this.fb.group({
    name:        ['', Validators.required],
    category:    ['Theatre', Validators.required],
    location:    ['Paris', Validators.required],
    address:     ['', Validators.required],
    website:     [''],
    description: [''],
  });

  save() {
    if (this.form.invalid) return;
    const formValue = this.form.value;
    const activity: Activity = {
      name: formValue.name ?? '',
      category: formValue.category ?? '',
      location: {
        name: formValue.location ?? '',
        address: '',
        placeId: ''
      }, 
      website: formValue.website ?? '',
      description: formValue.description ?? ''
    };
    this.activityService.add(activity);
    this.router.navigateByUrl('/');
  }
}