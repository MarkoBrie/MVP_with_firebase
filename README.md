# ActivityAngularApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.4.

| **Action**                | **Command** |
|----------------------------|-------------|
| Check remote repositories  | `git remote -v` |
| Initialize Git             | `git init` |
| Add GitHub remote          | `git remote add origin <repo-url>` |
| Fetch remote branches      | `git fetch origin` |
| Switch/create branch       | `git checkout -b <branch> [origin/<branch>]` |
| Add & commit changes       | `git add . && git commit -m "Message"` |
| Push to branch             | `git push -u origin <branch>` |

| **Action** | **Command** |
|-------------|-------------|
| Create a new folder | `mkdir 8_editor_component` |
| Move into the folder | `cd 8_editor_component` |
| Initialize a new Git repository | `git init` |
| Check repository status | `git status` |
| Check remote repositories (none yet) | `git remote -v` |
| Add GitHub repository as remote | `git remote add origin https://github.com/MarkoBrie/MVP_with_firebase.git` |
| Verify remote was added | `git remote -v` |
| List all branches again | `git branch -a` |
| Fetch branches from GitHub | `git fetch origin` |
| Checkout and track existing branch `7-data-model` | `git checkout 7-data-model` |
| Create a new branch `8-editor-component` from it | `git checkout -b 8-editor-component` |
| Push the new branch to GitHub and set upstream tracking | `git push -u origin 8-editor-component` |


## Development server

To start a local development server, run:

```bash
npm install
ng serve
```


Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
