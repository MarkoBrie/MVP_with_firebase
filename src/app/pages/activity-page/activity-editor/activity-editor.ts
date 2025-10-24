import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Activity } from '../../../models/activity';
import { DbActivityService } from '../../../services/db-activity-service';
import { ImageComponent } from '../../../components/image-component/image-component';
import { ImageService } from '../../../services/image-service';

@Component({
  standalone: true,
  selector: 'activity-edit',
  imports: [ReactiveFormsModule, RouterLink, FormsModule, ImageComponent],
  templateUrl: './activity-editor.html',
})
export class ActivityEditor {
  private fb = inject(FormBuilder);
  private activityService = inject(DbActivityService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  imageService = inject(ImageService)

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

  activity = signal<Activity>({
    location: {
      name: '',
      address: '',
      placeId: '',
    },
    name: '',
    category: '',
    image: undefined
  });

  image: File | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.activityService.get(id).then((activity) => { //if there is an activity we set it
        if (activity) {
          this.activity.set(activity);
        }//implicitly its a new activity
      });
    }
  }

  save() {
   //we have now split the save
    if(this.image){
      this.imageService.saveImage("/activities/beta", 
        this.image, 
        this.image.name,  
        (done:string) => {
          this.activity().image = done;
          this.doSave();
      })
    }else{
      this.doSave();
    }
  }

  private doSave(){
    //TODO you would want to do your own validate here ...
    //if we came here from an activity we want to update not create a new one.
    const tmp = this.activity();
    if (tmp && tmp.id) {//if there is an id then its an existing activity
      this.activityService.update(tmp.id, this.activity()).then(() => {
        this.router.navigateByUrl('/activity/' + this.activity().id);
      });
    } else { //its a new one so we create one and use the new id to route
      this.activityService.add(this.activity()).then((done) => {
        this.router.navigateByUrl('/activity/' + done);
      });
    }
  }
}