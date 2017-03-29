# how to build the tasknas app with framing


### **CLONE THE PROJECT**

go to the repo 
https://github.com/framing/ng-tasknas-demo 

hit clone (green button) on github

git clone git@github.com:framing/ng-tasknas-demo.git

### **NPM INSTALL**

```   
cd tasknas
npm i
npm run build
npm start
```

loads app and developer dependencies (these are maintained by Biznas) 

### **SETTING UP MATERIAL DESIGN**

open up http://localhost8080 in a browser, you’ll see a starter screen 

the welcome screen is nice, but we want our app to look like a material app

open up the app module, and this is what you’re going to see 

```typescript
import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

@NgModule(Framing((framing) => framing
 .root()
))
export class AppModule {}
```
you want it to look like an app, so next you 

```typescript
import { AppFramer } from '@framing/ng-ui';
```

And replace .root() with
```typescript
.frame(new AppFramer())
```

now it’s looking like a Material Design app, but you still don’t have any screens 

this framer uses the material design structure layout guide 

https://material.io/guidelines/layout/structure.html

### **WHAT'S NEXT?**

give your app a name by configuring it in the AppFramer 

as you can see in the screenshot, everything is strongly typed, so if your editor supports it, it will auto complete 

![auto complete.png](https://cloud.githubusercontent.com/assets/21727664/24475046/93d027a8-1483-11e7-805f-eb56be718fc2.png)

hit save, and you’ll see the changes automatically in the browser 

### **LET'S CREATE A SCREEN**

we’ll start with the dashboard 

inside the app folder, create a folder called dashboard 

and inside that folder create three files: 

dashboard.component.html

```html
<div> Welcome to dashboard </div>
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

now we have the dashboard screen, but we have to do 3 things! 

1. import the dashboard module
2. add dashborad as a child route of the app 
3. re-direct to that route when we load the app 

first, import the dashboard module
```typescript
import { DashboardModule } from './dashboard/dashboard.module';
```

then add this code below the .frame() method 
```typescript
.children([
   { path: '', redirectTo: 'dashboard' },
   { path: 'dashboard', loadChildren: () => DashboardModule },
 ])
 ```

it will now appear in your browser when you hit save, but it’s not listed in the side nav

to do that we need to add sideNavItems array with a single item in it (dashboard) 

here is what your code should look like now

```typescript
import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { AppFramer } from '@framing/ng-ui';

@NgModule(Framing((framing) => framing
  .frame(new AppFramer({
    title: 'Tasknas',
    sideNavItems: [
      { routerLink: 'dashboard', label: 'Dashboard' },
    ],
  }))
  .children([
    { path: '', redirectTo: 'dashboard' },
    { path: 'dashboard', loadChildren: () => DashboardModule },
  ])
))
export class AppModule {}
```

now you have an app, with a screen, and it’s in the side nav...GREAT JOB! 

### **LET'S GET OUR SECOND SCREEN STARTED** 

let’s add a task screen 

create a tasks folder 

create a tasks.component.html 

inside of here create a 

```html
div tag saying <div> this is my task list </div>
```

create tasks.component.ts 

```typescript 
import { Component } from '@angular/core';

@Component({
 selector: 'tasks',
 styleUrls: [ './tasks.component.css' ],
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
 .componentAndDeclare(TasksComponent)
))
export class TasksModule {}
```

now we have the tasks screen, but we have to do 2 things! 

1. import the tasks module
2. add tasks as a child route of the app 

first, import the tasks module 

```typescript
import { TasksModule } from './tasks/tasks.module';
```

then add another item to the sideNavItems array 

```typescript
{ routerLink: 'tasks', label: 'Tasks' },
```

then add another item to the .children array

```typescript
{ path: 'tasks', loadChildren: () => TasksModule },
```

hit save and the app will auto refresh in the browser and you’ll now see the tasks screen and you can navigate to it 

### **USE ITEM FRAMER TO MANAGE TASKS**

app framer provides standard requirements that would be in a Material based app 

item framer provides standard requirements around managing data (CRUD)

step 1 - import the item framer 

```typescript
import { ItemFramer } from 'framers/item/item.framer';
```

step 2 - get rid of the custom tasks component you made and replace it

so this line: 

```typescript
.componentAndDeclare(TasksComponent)
```

becomes this:

```typescript
.frame(new ItemFramer({
   items: [
     { label: 'Do laundry' },
     { label: 'Clean dishes' },
     { label: 'Wash car' },
   ]
 }))
```

### **LET’S KEEP YOUR DATA AROUND FOR A WHILE**

we will persist it by using firebase (neat!)

go to your terminal window and kill the app by hitting “ctrl + c”

step 1 - install the firebase dependencies 

`npm i angularfire2 firebase --save` 

then you have to go to the firebase website and click “get started” 

http://firebase.google.com

then go into the app.module.ts and import the firebase module 

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

next, let’s look at the tasks.module.ts file 

we import the firebase adaptor we created 

```typescript
	import { ItemDataFirebaseService } from 'framers/item/shared/item-data-firebase.service';
```

next, we are going to update ItemFramer so that it is now longer a static array of tasks 

```typescript
.frame(new ItemFramer({
   endpoint: 'tasks',
   itemDataProvider: ItemDataFirebaseService,
 })),
 ```

hit save - the screen will reload 

now for the magic 

if you know the local IP address of your computer you can load the app in a browser on your phone and add a new task, it will then show up in the browser your computer...NEAT!

### **LASTLY**

tasks need more that a label 

so to do that create a components folder underneath the tasks folder and add this code into the task-form.component.ts file: 

```typescript 
import { Component } from '@angular/core';

import { ItemModel } from '@framing/ng-ui';

@Component({
 selector: 'task-form',
 templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
 public constructor(
   public itemModel: ItemModel,
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

and create task-form.component.module.ts and add this in: 


```typescript
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { Framing } from '@framing/ng-core';

import { TaskFormComponent } from './task-form.component';

@NgModule(Framing((framing) => framing
 .imports([
   MaterialModule,
 ])
 .declarationsAndEntryComponents([
   TaskFormComponent,
 ])
))
export class TasksComponentsModule {}
```

and then go back into the tasks.module.ts file and add in: 


```typescript
import { TasksComponentsModule } from './components/tasks-components.module';

import { TaskFormComponent } from './components/task-form.component';
```

then in tasks.module.ts file above the .frame() method add in: 

```typescript
.import(TasksComponentsModule)
```

then (in the tasks.module.ts) add this into the item framer config: 

```typescript
itemFormComponent: TaskFormComponent,
```

this is what you code should look like now 

```typescript
import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { ItemFramer, ItemDataFirebaseService } from '@framing/ng-ui';

import { TasksComponentsModule } from './components/tasks-components.module';
import { TaskFormComponent } from './components/task-form.component';

@NgModule(Framing((framing) => framing
 .import(TasksComponentsModule)
 .frame(new ItemFramer({
   endpoint: 'tasks',
   itemDataProvider: ItemDataFirebaseService,
   itemFormComponent: TaskFormComponent,
 })),
export class TasksModule {}
```
now hit save!
