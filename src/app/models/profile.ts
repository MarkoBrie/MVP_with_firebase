export interface Profile {
  userId?: string;
  id?: string;          
  name?: string;
  surname?: string;
  displayName: string;
  email: string;
  about?: string;        
  tags?: string[];
  roles?: string[];
}