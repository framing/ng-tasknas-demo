# how to build the tasknas app with framing


### **CLONE THE PROJECT**

Use our ng-app project to get started

```
git clone https://github.com/biznas/ng-app.git tasknas
```

### **NPM INSTALL**

```   
cd tasknas
npm i
npm start
```

loads app and developer dependencies (these are maintained by Biznas) 

### **SETTING UP MATERIAL DESIGN**

open up http://localhost:8080 in a browser, you’ll see a starter screen 

the welcome screen is nice, but we want our app to look like a material app

open up the src/app/app.module.ts, and this is what you’re going to see 

```typescript
import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { AppComponent } from './app.component';

@NgModule(Framing((framing) => framing
  .root()
  .componentAndDeclare(AppComponent)))
export class AppModule {}
```
The ng-app project got you up and running quickly with Angular 4, but it's not much of an app yet. To help with that, I'll introduce you to the AppFramer, it's job is to enforce the Google Material Layout Structure Guidelines. 

https://material.io/guidelines/layout/structure.html

To do this:

```
npm i @framing/ng-tasknas-framers --save
```

Open up src/app/app.module.ts, remove the AppComponent import and replace it with the following:

```typescript
import { AppFramer } from '@framing/ng-tasknas-framers';
```

And replace:

```typescript
  .root()
  .componentAndDeclare(AppComponent)))
```
with:

```typescript
  .frame(new AppFramer())))
```

Ok, wait for it to build, your browser will automatically refresh.

Woo hoo! Now it’s looking like a Material Design app!

### **WHAT'S NEXT?**

Give your app a name by configuring it in the AppFramer

```typescript
  .frame(new AppFramer().model({ title: 'Tasknas' }))))
```

as you can see in the screenshot, everything is strongly typed, so if your editor supports it, it will auto complete 

![auto complete.png](https://cloud.githubusercontent.com/assets/21727664/24475046/93d027a8-1483-11e7-805f-eb56be718fc2.png)

hit save, and you’ll see the changes automatically in the browser 

### **LET'S CREATE A SCREEN**

we’ll start with the dashboard 

inside the app folder, create a folder called dashboard 

and inside that folder create three files: 

dashboard.component.html

```html
<div>Welcome to the dashboard</div>
```

dashboard.component.ts (this is just a regular dashboard component) 

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
```

dashboard.module.ts

```typescript 
import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { DashboardComponent } from './dashboard.component';

@NgModule(Framing((framing) => framing
  .componentAndDeclare(DashboardComponent),
))
export class DashboardModule {}
```

now we have the dashboard screen, but we have to do 3 things to src/app/app.module.ts! 

1. import the dashboard module
2. add dashboard as a child route of the app 
3. re-direct to that route when we load the app 

first, import the dashboard module
```typescript
import { DashboardModule } from './dashboard/dashboard.module';
```

then add a .route() and .children() call chained to the .frame() method 
```typescript
  .route({}, {
    forRoot: true,
    extraRootRouterOptions: {
      enableTracing: true,
      useHash: true,
    },
  })
  .children([
    { path: '', redirectTo: 'dashboard' },
    { path: 'dashboard', loadChildren: () => DashboardModule },
  ])
 ```

it will now appear in your browser when you hit save, but it’s not listed in the side nav

to do that we need to add sideNavItems array with a single item in it (dashboard) 

```typescript
  .frame(new AppFramer().model({
    title: 'Tasknas',
    sideNavItems: [
      { label: 'Dashboard', routerLink: '/dashboard' },
    ],
  }))
```

In case you're not seeing the exciting result I'm describing, here is what your code should look like now:

```typescript
import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { AppFramer } from '@framing/ng-tasknas-framers';

import { DashboardModule } from './dashboard/dashboard.module';

@NgModule(Framing((framing) => framing
  .frame(new AppFramer().model({
    title: 'Tasknas',
    sideNavItems: [
      { label: 'Dashboard', routerLink: '/dashboard' },
    ],
  }))
  .route({}, {
    forRoot: true,
    extraRootRouterOptions: {
      enableTracing: true,
      useHash: true,
    },
  })
  .children([
    { path: '', redirectTo: 'dashboard' },
    { path: 'dashboard', loadChildren: () => DashboardModule },
  ])))
export class AppModule {}

```

Now you have an app, with a screen, and it’s in the side nav...GREAT JOB! 

### **LET'S GET OUR SECOND SCREEN STARTED** 

Let’s add a task screen!

Inside the app folder create a tasks folder.

create a tasks.component.html 

```html
<div>this is my task list </div>
```

create tasks.component.ts 

```typescript 
import { Component } from '@angular/core';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
})
export class TasksComponent {}
```

create tasks.module.ts

```typescript
import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { TasksComponent } from './tasks.component';

@NgModule(Framing((framing) => framing
  .componentAndDeclare(TasksComponent)))
export class TasksModule {}
```

now we have the tasks screen, but we have to do 2 things! 

1. import the tasks module
2. add tasks as a child route of the app 

first, import the tasks module 

```typescript
import { TasksModule } from './tasks/tasks.module';
```

then the Tasks screen to the sideNavItems array 

```typescript
.frame(new AppFramer().model({
    title: 'Tasknas',
    sideNavItems: [
      { label: 'Dashboard', routerLink: '/dashboard' },
      { label: 'Tasks', routerLink: '/tasks' },
    ],
  }))
```

then add another item to the .children array

```typescript
  .children([
    { path: '', redirectTo: 'dashboard' },
    { path: 'dashboard', loadChildren: () => DashboardModule },
    { path: 'tasks', loadChildren: () => TasksModule },
  ])))
```

hit save and the app will auto refresh in the browser and you’ll now see the tasks screen and you can navigate to it 

### **USE ITEM FRAMER TO MANAGE TASKS**

So, that's not really a great list of tasks. To fix that, lets use ItemFramer

AppFramer provides standard requirements that would be in a Material based app 

ItemFramer provides standard requirements around managing data (CRUD)

Complete the following in src/app/tasks/tasks.module.ts

step 1 - import the item framer 

```typescript
import { ItemFramer } from '@framing/ng-tasknas-framers';
```

step 2 - get rid of the custom tasks component you made and replace it

so this line: 

```typescript
  .componentAndDeclare(TasksComponent))
```

becomes this:

```typescript
  .frame(new ItemFramer({
    items: [
      { label: 'Do laundry' },
      { label: 'Clean dishes' },
      { label: 'Wash car' },
    ],
  }))))
```

### **LET’S KEEP YOUR DATA AROUND FOR A WHILE**

we will persist it by using firebase (neat!)

go to your terminal window and kill the app by hitting “ctrl + c”

step 1 - install the firebase dependencies 

```
npm i angularfire2 firebase --save
``` 

then you have to go to the firebase website and click “get started” 

http://firebase.google.com

then go into the src/app/app.module.ts and import the firebase module 

```typescript
import { AngularFireModule } from 'angularfire2';
```

next (above @NgModule) you’re going to configure firebase

```typescript
export const firebaseConfig = {
 apiKey: '<your-key>',
 authDomain: '<your-project-authdomain>',
 databaseURL: '<your-database-URL>',
 storageBucket: '<your-storage-bucket>',
 messagingSenderId: '<your-messaging-sender-id>'
};
```

^ populate this with all of the specifics that firebase gave you when you set up your account (you can copy paste this from firebase) 

above your .frame() method, include this: 

```typescript
.import(AngularFireModule.initializeApp(firebaseConfig))
```

next, open src/app/tasks/tasks.module.ts file 

Import the firebase adaptor we created 

```typescript
import { ItemDataFirebaseService, ItemFramer } from '@framing/ng-tasknas-framers';
```

next, we are going to update ItemFramer so that it is now longer a static array of tasks 

```typescript
@NgModule(Framing((framing) => framing
  .frame(new ItemFramer()
    .itemDataProvider(ItemDataFirebaseService)
    .model({
      endpoint: 'tasks',
    }))))
export class TasksModule {}
 ```

hit save - the screen will reload 

now for the magic 

if you know the local IP address of your computer you can load the app in a browser on your phone and add a new task, it will then show up in the browser of your computer...NEAT!

### **LASTLY**

tasks need more than a label 

so to do that create src/app/tasks/view folder and add this code into a task-form.component.ts file: 

```typescript 
import { Component } from '@angular/core';

import { ItemController } from '@framing/ng-tasknas-framers';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  public constructor(
    public itemController: ItemController,
  ) {}
}
```

and create a task-form.component.html with this code: 

```typescript 
<div fxFlex="column">
  <md-input-container>
    <input md-input [(ngModel)]="itemModel.item.label" placeholder="Label">
  </md-input-container>

  <md-input-container>
    <md-checkbox [(ngModel)]="itemModel.item.done">Done</md-checkbox>
  </md-input-container>

  <md-input-container>
    <input md-input [(ngModel)]="itemModel.item.dueDate" placeholder="Due Date">
  </md-input-container>
</div>
```

and create tasks-view.module.ts and add this in: 

```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { Framing } from '@framing/ng-core';

import { TaskFormComponent } from './task-form.component';

@NgModule(Framing((framing) => framing
 .imports([
   FormsModule,
   MaterialModule,
 ])
 .declarationsAndEntryComponents([
   TaskFormComponent,
 ])))
export class TasksViewModule {}
```

and then go back into the tasks.module.ts file and add in: 

```typescript
import { TaskFormComponent } from './view/task-form.component';
import { TasksViewModule } from './view/tasks-view.module';
```

then in tasks.module.ts file above the .frame() method add in: 

```typescript
  .import(TasksViewModule)
```

then (in the tasks.module.ts) add this into the item framer config: 

```typescript
@NgModule(Framing((framing) => framing
  .import(TasksViewModule)
  .frame(new ItemFramer()
    .itemDataProvider(ItemDataFirebaseService)
    .model({
      endpoint: 'tasks',
    })
    .view({
      itemFormComponent: TaskFormComponent,
    }))))
export class TasksModule {}
```

Save that and go check the app out. You'll see now selecting an existing task or creating a new one you can now mark your task as done and set a due date.

Go ahead, update your tasks, have a beer, celebrate your success!

You can see a more full featured version of Tasknas here:
https://github.com/framing/ng-tasknas-demo
