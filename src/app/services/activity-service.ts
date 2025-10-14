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

  add(activity:Activity){
    this.activites.push(activity);
  }

}