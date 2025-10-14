import { Component, inject, signal } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from '@firebase/auth';

@Component({
  selector: 'app-login-page',
  imports: [],
  standalone: true,
  templateUrl: './login-page.html'
})
export class LoginPage {

  user = signal<User | null>(null);
  private auth = inject(Auth);
  

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      console.log("do we have a user", user)
      this.user.set(user);
    });
  }

  async signInWithGoogle() {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
  }
}