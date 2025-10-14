# Application Structure

What we are missing now is the more standard parts of a an application:

- landing page
- navigation bar
- footer

```
+--------------------------------------------------------------------------------------------+
| LOGO       | Home | Activities | About | Contact                  | Search [____] | [New]  |
+--------------------------------------------------------------------------------------------+
| HERO SECTION                                                                               |
| ------------------------------------------------------------------------------------------ |
|  [Big Headline: Discover great places]                [ Call to Action ]   [ Illustration ]|
|  Short subheading that explains value proposition.                                         |
|                                                                                            |
+--------------------------------------------------------------------------------------------+
| FEATURES / CATEGORIES                                                                      |
| ------------------------------------------------------------------------------------------ |
|  [Theatre]   [Museums]   [Restaurants]   [Parks]   [Workshops]                             |
|  Quick cards with title, short description, location, and small image/icon                 |
+--------------------------------------------------------------------------------------------+
| ACTIVITY LIST / HIGHLIGHTS                                                                 |
| ------------------------------------------------------------------------------------------ |
+--------------------------------------------------------------------------------------------+
| LOGO  •  © 2025 YourAppName                     Links: Terms | Privacy | Help | Contact    |
| Follow: [Twitter] [Instagram] [LinkedIn]                     Built with ❤️ and Angular     |
+--------------------------------------------------------------------------------------------+

```

These items are kind of critical for any modern application. We would also suggest that for SEO and general site usability you would probably require (and you should start to prepare):

- FAQ: frequently asked questions
- Contact form: either by email or by internal form
- login/logout/signup/profiles pages

There are also different images and icons that are required as well as different resources that you are likely ro need:

- terms and conditions
- social media links
- contact emails.

In this module we cover **navigation bar** and **footer**.

## Navigation Bar

```
ng g c components/navigation-bar --standalone
```

This creates:

```
src/app/components/navbar/
  ├── navigation-bar.ts
  ├── navigation-bar.html
  ├── navigation-bar.css
  └── navigation-bar.spec.ts
```
You can delete *.spec* and *.css*.

Add the below code to **navigation-bar.ts**.

```
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./navigation-bar.html",
})
export class NavigationBar {
  open = signal(false);
}
```

And then for the viewer in **navigation-bar.ts**:

```
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

      <!-- Brand -->
      <a routerLink="/" class="flex items-center gap-2">
        <img src="logo.png" alt="" class="h-6 w-6"/>
        <span class="font-semibold">Activity<span class="text-blue-600">App</span></span>
      </a>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-6">
        <a routerLink="/" routerLinkActive="text-blue-600" [routerLinkActiveOptions]="{exact:true}"
           class="text-sm text-gray-700 hover:text-gray-900">Home</a>
        <a routerLink="/challenges" routerLinkActive="text-blue-600"
           class="text-sm text-gray-700 hover:text-gray-900">Activities</a>
        <a routerLink="/about" routerLinkActive="text-blue-600"
           class="text-sm text-gray-700 hover:text-gray-900">About</a>
      </nav>

      <!-- Right actions -->
      <div class="hidden md:flex items-center gap-3">
        <a routerLink="/login" class="text-sm text-gray-700 hover:text-gray-900">Log in</a>
        <a routerLink="/signup"
           class="text-sm px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Get started</a>
      </div>

      <!-- Mobile menu button -->
      <button type="button" (click)="open.set(!open())"
              class="md:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle menu" aria-expanded="{{ open() }}">
        @if(!open()){
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
             d="M4 6h16M4 12h16M4 18h16"/></svg>
        }@else {
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
             d="M6 18L18 6M6 6l12 12"/></svg>
        }
      </button>
    </div>

    <!-- Mobile drawer -->
     @if(open()){
    <div class="md:hidden">
      <div class="px-4 pb-4 space-y-2 border-t border-gray-200 bg-white">
        <a routerLink="/" [routerLinkActiveOptions]="{exact:true}" routerLinkActive="!text-gray-900 text-blue-600"
           class="block py-2 text-gray-700">Home</a>
        <a routerLink="/challenges" routerLinkActive="!text-gray-900 text-blue-600"
           class="block py-2 text-gray-700">Challenges</a>
        <a routerLink="/about" routerLinkActive="!text-gray-900 text-blue-600"
           class="block py-2 text-gray-700">FAQ</a>
        <div class="pt-2 flex gap-3">
          <a routerLink="/login" class="text-sm text-gray-700 py-2">Log in</a>
          <a routerLink="/signup"
             class="text-sm px-3 py-2 rounded-lg bg-blue-600 text-white">Get started</a>
        </div>
      </div>
    </div>
     }


  </header>
  ```
Add your logo in the **/public/** folder.

And now in **app.html** we need the bar to stay fixed above the dynamic content so we will add:

```
<navbar></navbar>
<router-outlet ></router-outlet>
```

Finally, add the following code to **app.ts**:

```
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivityService } from './services/activity-service';
import { NavigationBar } from './components/navigation-bar/navigation-bar';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBar],//, ActivityPage],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('activity-angular-app');
  private activityService = inject(ActivityService);

  //get activites() {
  //  return this.activityService.list();
  //}
}
```

After this the page should render:


![](https://firebasestorage.googleapis.com/v0/b/mvp-template-dbd61.firebasestorage.app/o/237ab85a-8ee8-4a77-8452-e38cad87663d.webp?alt=media&token=fe6a58ba-b619-4295-a9d4-eee89c9137fe)

So the next things to do are:

- do exactly the same as above for the footer
- create the other pages: landing or home and faq.
- add in the routes to these pages and update the navbar

## Footer

Create a footer:

```
ng g c components/footer
```

in **footer.ts** add:

```
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./footer.html",
})
export class FooterComponent {
  year = new Date().getFullYear();
}
```

and the **footer.html** would be something like: 

```
<footer class="border-t border-gray-200 bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div>
          <div class="font-semibold mb-2">ActivityApp</div>
          <p class="text-gray-600">Curate and create local activities for your guests and future friends.</p>
        </div>

        <div>
          <div class="font-semibold mb-2">Product</div>
          <ul class="space-y-1 text-gray-600">
            <li><a routerLink="/activities" class="hover:text-gray-900">Activities</a></li>
            <li><a routerLink="/pricing" class="hover:text-gray-900">Pricing</a></li>
            <li><a routerLink="/faq" class="hover:text-gray-900">FAQ</a></li>
          </ul>
        </div>

        <div>
          <div class="font-semibold mb-2">Company</div>
          <ul class="space-y-1 text-gray-600">
            <li><a routerLink="/about" class="hover:text-gray-900">About</a></li>
            <li><a routerLink="/contact" class="hover:text-gray-900">Contact</a></li>
            <li><a routerLink="/careers" class="hover:text-gray-900">Careers</a></li>
          </ul>
        </div>

        <div>
          <div class="font-semibold mb-2">Legal</div>
          <ul class="space-y-1 text-gray-600">
            <li><a routerLink="/privacy" class="hover:text-gray-900">Privacy</a></li>
            <li><a routerLink="/terms" class="hover:text-gray-900">Terms</a></li>
          </ul>
        </div>
      </div>

      <div class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <div>© {{ year }} ActivityApp. All rights reserved.</div>
        <div class="flex items-center gap-4">
          <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener" class="hover:text-gray-700">Twitter</a>
          <a href="https://github.com/yourrepo" target="_blank" rel="noopener" class="hover:text-gray-700">GitHub</a>
          <a href="mailto:hello@example.com" class="hover:text-gray-700">Email</a>
        </div>
      </div>
    </div>
  </footer>
```

Clearly you might not need all of these different pages but its to give you an idea of what you should do. 

Note: don't call the selector footer as it would conflict with the html element footer. 

In our **app.html** we can now finalise the viewer:

```
<navbar />
<main class="min-h-screen">
    <router-outlet />
</main>
<app-footer></app-footer>

```

Finally, add the component to **app.ts**:

``` 
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { ActivityPage } from './pages/activity-page/activity-page';
import { ActivityService } from './services/activity-service';
import { NavigationBar } from './components/navigation-bar/navigation-bar';
import { FooterComponent } from './components/footer/footer';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBar, FooterComponent],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('activity-angular-app');
  private activityService = inject(ActivityService);

  //get activites() {
  //  return this.activityService.list();
  //}
}
```

Note that we add some styling to the content area so that it takes the height of the screen even if there isn't much to see.



![](https://firebasestorage.googleapis.com/v0/b/mvp-template-dbd61.firebasestorage.app/o/ea407204-9ec0-460e-b769-2c8fcd6e7002.webp?alt=media&token=44612020-f10f-4a0b-ab36-78b6f18cab92)

## Next

In the next section we will vibe code our way to a landing page.