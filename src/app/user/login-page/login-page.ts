import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- used for ngModel and two-way binding in password and email inputs
import { Auth, signInWithEmailAndPassword, User } from '@angular/fire/auth';
//import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, AuthError } from '@firebase/auth';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, AuthError } from '@angular/fire/auth';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
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

  async signout() {
    // Signs the user out of the Firebase session
    await this.auth.signOut();
    // Manually setting user to null can provide a faster UI update
    this.user.set(null);
  }

  // Email and Password Authentication
  email = '';
  password = '';
  async signUpWithEmail() {
    await createUserWithEmailAndPassword(this.auth, this.email, this.password);
  }

  async signInWithEmailAndPassword() {
    try{
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
    }catch(err){
      console.log(err)
    }
  }
}