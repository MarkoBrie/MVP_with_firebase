
# 4. Email Login

- Enabling **email** login in Firebase
- Adding code for **registering new users**

## Enabling **email** login in Firebase
You need to go back to the authentication section of firebase and add in email:

![](https://firebasestorage.googleapis.com/v0/b/mvp-template-dbd61.firebasestorage.app/o/089e62b6-7539-4b19-b762-56f1c448d0a4.webp?alt=media&token=3d1b925e-215a-4b8b-91b8-c8236579bc87)

Authentication through *email* is slightly different as we need to **create accounts** through a **sign-up process** before we can actually login.

## Adding Sign Up process 

The *[(ngModel)]* syntax, which we are using for *two-way data binding* on our email and password inputs, is part of Angular's **FormsModule**. Because we are using a standalone component, we must explicitly import any modules we need directly into that component.

So we add some more calls to auth now and create **login by email**:

Add the below code to **login-page.ts**.

```ts
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- used for ngModel and two-way binding in password and email inputs
import { Auth, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from '@firebase/fire/auth';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login-page.html'
})
export class LoginPage {

  user = signal<User | null>(null);
  private auth = inject(Auth);
  email = "";
  password = ""

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      console.log("do we have a user", user)
      this.user.set(user);
    });
  }

  async signInWithGoogle() {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

    async signout() {
    timer(1000).subscribe(() => {
      this.auth.signOut();
      //this.router.navigateByUrl("/");//optionally route away from normally logout page
    });
  }

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
```

Firstly lets ask GPT to create a nicer email login ;-)

Add the below code to **login-page.html**:

```html
<div class="m-12">
    <p>Login Page</p>
    
    @if(!user()){
        <button (click)="signInWithGoogle()" class="rounded bg-neutral-900 text-white px-3 py-1">Sign in With Google</button>
    }@else {
        <button (click)="signout()" class="rounded bg-neutral-900 text-white px-3 py-1">Logout</button>
    }
    
    


    <div class="m-8 flex flex-col gap-8">
<!-- Make sure FormsModule is imported in this component -->
<div class="flex w-full max-w-sm flex-col gap-3">
  <label for="email" class="text-sm font-medium text-neutral-700">Email</label>
  <input
    id="email"
    name="email"
    type="email"
    [(ngModel)]="email"
    placeholder="you@example.com"
    autocomplete="email"
    class="rounded border px-3 py-2"
    required
  />

  <label for="password" class="text-sm font-medium text-neutral-700">Password</label>
  <input
    id="password"
    name="password"
    type="password"
    [(ngModel)]="password"
    placeholder="••••••••"
    autocomplete="current-password"
    class="rounded border px-3 py-2"
    required
  />

  <button
    type="button"
    class="rounded bg-neutral-900 px-3 py-2 text-white disabled:opacity-50"
    (click)="signInWithEmailAndPassword()"
    [disabled]="!email || !password"
  >
    Email Login
  </button>
</div>
    <div>{{user()?.displayName}}</div>
</div>

    <div>User state {{user()?.displayName}}</div>
</div>
```
When we login it will fail with a cryptic message:

![](https://firebasestorage.googleapis.com/v0/b/mvp-template-dbd61.firebasestorage.app/o/d89fd813-2259-4e82-9ca6-93c94cae03a7.webp?alt=media&token=bfd98a73-7ab3-4f1b-b0b0-c969e408a8c2)

but it means we have never logged in before so no account for email. Email authentication is stored in firebase so you have to create an account rather than a reference. So lets sign in first:

```html
  <div class="flex w-full gap-4">
  <button
    type="button"
    class="rounded bg-neutral-900 px-3 py-2 text-white disabled:opacity-50"
    (click)="signInWithEmailAndPassword()"
    [disabled]="!email || !password"
  >
    Email Login
  </button>

  <button
    type="button"
    class="rounded bg-neutral-900 px-3 py-2 text-white disabled:opacity-50"
    (click)="signUpWithEmail()"
    [disabled]="!email || !password"
  >
    Email Signup
  </button>
</div>
```

Add a second button that will call our signup method. And now we get a new login 

![](https://firebasestorage.googleapis.com/v0/b/mvp-template-dbd61.firebasestorage.app/o/95009187-6ce0-4785-8cd0-607ba4400a2f.webp?alt=media&token=4fddf2ef-64bd-4b61-95b1-b4b288ad8708)

There are two things to note now that the user has been created so we can't create a new account with the same credentials again, we would need to login next time (not sign up)
