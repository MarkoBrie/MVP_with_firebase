import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth, signInWithEmailAndPassword, User } from '@angular/fire/auth';  // for authentication
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, AuthError } from '@angular/fire/auth'; //for authentication

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

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      //console.log("do we have a user", user)
      this.user.set(user);
    });
  }
}
