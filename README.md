# MVP_with_firebase
You find an interactive analysis of Firebase as an MVP accelerator here: https://markobrie.github.io/MVP_with_firebase/. 


# Creating a New Angular Project from Scratch

This guide provides the complete step-by-step process for creating a new Angular application from an empty directory using the Angular CLI.

## Table of Contents
1.  [Prerequisites](#prerequisites)
2.  [Creating the Application](#creating-the-application)
3.  [Running the Development Server](#running-the-development-server)
4.  [Project Structure & Next Steps](#project-structure--next-steps)

---

## 1. Prerequisites

Before you start, ensure you have the necessary tools installed on your system.

* **Node.js and npm**: Angular requires a current or LTS (Long-Term Support) version of Node.js. npm is included with the installation. You can download it from [nodejs.org](https://nodejs.org/).
* **Angular CLI**: The command-line interface for Angular. If you haven't installed it yet, open your terminal and run the following command to install it globally:
    ```bash
    npm install -g @angular/cli
    ```

---

## 2. Creating the Application

This is the main step where the Angular CLI generates your project structure, including the `package.json` file.

**A. Run the `ng new` Command**

Navigate in your terminal to the parent directory where you want your new project folder to be created (e.g., `cd Documents/Projects`). Then, run the `ng new` command followed by your desired project name:

```bash
ng new my-awesome-app
```
*(Replace `my-awesome-app` with your project's name)*

**B. Answer the CLI Prompts**

The CLI will ask you two configuration questions:

> **Would you like to add Angular routing?** (Recommended: **Yes**)
> This sets up the necessary module for navigating between different pages in your application.

> **Which stylesheet format would you like to use?** (Choose **CSS** or your preferred preprocessor like SCSS).
> Use the arrow keys to select an option and press Enter.

**C. Automatic Setup**

The Angular CLI will now automatically perform the following tasks:
1.  Creates a new directory named `my-awesome-app`.
2.  Generates the complete starter project structure, including the crucial **`package.json`** file.
3.  Installs all the required npm packages by running `npm install` for you.

> **Note**: You do **not** need to run `npm install` yourself, as this step is handled automatically by the `ng new` command.

---

## 3. Running the Development Server

Once the setup is complete, you can run your new application.

**A. Navigate into Your Project Directory**

```bash
cd my-awesome-app
```

**B. Start the Server**

Use the `ng serve` command to compile the app and start the local development server.

```bash
ng serve --open
```
The `--open` flag will automatically open your browser to the application.

Your brand new Angular application is now running and accessible at **`http://localhost:4200/`**.

---

## 4. Project Structure & Next Steps

Your project is now fully set up. You can start developing by opening the project folder in your code editor.

* The main application code is located in the `src/app/` directory.
* Start by editing `src/app/app.component.html` to see live changes in your browser.
* Use `ng generate component component-name` to create new components easily.