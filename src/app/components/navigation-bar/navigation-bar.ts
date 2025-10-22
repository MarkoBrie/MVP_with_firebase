import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth, signInWithEmailAndPassword, User } from '@angular/fire/auth';  // for authentication
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, AuthError } from '@angular/fire/auth'; //for authentication

// using profile service and model
import { Profile } from '../../models/profile';
import { ProfileService } from '../../services/profile';


@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./navigation-bar.html",
})
export class NavigationBar {
  open = signal(false);

  user = signal<User | null>(null); 
  private auth = inject(Auth);

  profileService = inject(ProfileService)
  profile = signal<Profile | null>(null);

  //constructor() {
  //  onAuthStateChanged(this.auth, (user) => {
  //    //console.log("do we have a user", user)
  //    this.user.set(user);
  //    this.profileService.get(this.user().uid).then(profile => {
  //      this.profile.set(profile)
  //    });
  //  });
  //}
  //
  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.user.set(user);
      // Add a check to ensure 'user' is not null before accessing 'uid'
      // TypeScript's strict mode points out places where a value could be null or undefined
      if (user) {
        // Fetch the profile using the guaranteed non-null user.uid
        this.profileService.get(user.uid).then(profileData => {
          this.profile.set(profileData); // Set profile (will be null if get returns null)
        }).catch(error => {
          // Optional: Add error handling for the get() promise
          console.error("Error fetching profile:", error);
          this.profile.set(null); // Ensure profile is null on error
        });
      } else {
        // If user is null (logged out), set profile to null
        this.profile.set(null);
      }
    });
  }
  //---
}
