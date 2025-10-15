import { Component, inject, signal } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, AuthError } from '@firebase/auth';

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
      //console.log("do we have a user", user)
      this.user.set(user);
    });
  }

  //async signInWithGoogle() {
  //  console.log("signInWithGoogle()");
  //  await signInWithPopup(this.auth, new GoogleAuthProvider());
  //}

    async signInWithGoogle() {
    console.log("signinWithGoogle()");
    try {
      const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
      console.log("Successfully signed in:", result.user);
    } catch (error) {
      // This will now log the specific error from Firebase
      const authError = error as AuthError;
      console.error("Firebase Auth Error:", authError.code, authError.message);
    }
  }
}