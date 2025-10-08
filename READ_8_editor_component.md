# Models

In ts we can create a model for our data. Its not required but it allows us to better mange our data types and add some control. With typescript it can be convenient (and a pain) to add specific types but in the futures we will see the value.

Lets model the activity and refactor the code to use it.

## Activity.ts

Create a file: models/activity.ts and put in the following:

```
export interface Location {
    name: string;
    address: string;
    placeId: string;
}

export interface Activity {
    id?: string;
    location: Location;
    name:string;
    website?: string;
    description?:string;
    category: string;
}
```

Note that we have exported two models: Location and Activity. Each model exposes its attributes and as you can see these attributes can be complex types like location (the location type here is conveniently modelled on a google notion of a place so we can integrate with maps in the future). 

Other data types include:

- string
- Date
- boolean
- number
- any typed object like location
- any or [] of any type

Note that there is a ? next to id. Why? A model object must have all attributes whereas a ? makes it optional. And why would we make id optional? Because in later sections when we use firebase we want the backend to provide the id whereas if its required we could end up over writing the value with our own default. In any case lets now use this modl.

## Activity Service

We will type this service:

```
import { Injectable } from '@angular/core';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  activites: Activity[] = [{ 
    "category": "Theatre", 
    "id": "1",
    "location": {
      "name": "Comédie-Française",
      "address": "2 Rue de Richelieu, 75001 Paris",
      "placeId": "some-place-id"
    },
    "name": "Comédie-Française", 
    "website": "https://www.comedie-francaise.fr", 
    "description": "France’s national theatre with classical French plays; iconic and historical venue." }]

  
  list(): Activity[]{
    return this.activites;
  }

  get(id:string): Activity | undefined{
    return this.activites.find(f => f.id === id);
  }


  add(activity:Activity){ //we can use this for creating new activities soon
    this.activites.push(activity);
  }

}

```

Why is this important? Well its not critical but we will see later that we can further abstract our services so that we can use a generic data service. For this MVP its not so important but as we add datatypes we will see it becomes useful to have boilerplate code that we can re-use. 

## List, Editor and viewer

I leave it as a small exercise to now update the list view and viewer to use the new model

## Next 

We can now move on to the editor and create some activities.
