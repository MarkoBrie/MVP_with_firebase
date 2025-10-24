export interface Location {
  name: string;
  address: string;
  placeId: string;
}

export interface Activity {
  id?: string;
  name: string;
  category: string;
  location: Location;
  website?: string;
  description?: string;
  address?: string;
  createdAt?: Date; //we want the date
  image?: string;
}
