import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';
import { AppFramer } from '@framing/ng-tasknas-framers';

import { AngularFireModule } from 'angularfire2';

import { SharedModule } from './shared/shared.module';

import { DashboardModule } from './dashboard/dashboard.module';
import { MoodsModule } from './moods/moods.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

import { AppBarTitleComponent } from './shared/components/app-bar-title/app-bar-title.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyDR7bQt1Ey0yysX3drYZV_85dBrs4UNebc',
  authDomain: 'tasknas-4b74d.firebaseapp.com',
  databaseURL: 'https://tasknas-4b74d.firebaseio.com',
  storageBucket: 'tasknas-4b74d.appspot.com',
  messagingSenderId: '991560340361',
};

@NgModule(Framing((framing) => framing
  .imports([
    SharedModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ])
  .declareAndEntryComponent(AppBarTitleComponent)
  .frame(new AppFramer(
    {
      sideNavItems: [
        { routerLink: '/dashboard', label: 'Dashboard' },
        { routerLink: '/tasks', label: 'Tasks' },
        { routerLink: '/moods', label: 'Moods' },
        { routerLink: '/users', label: 'Users' },
      ],
    },
    {
      appBarTitleComponent: AppBarTitleComponent,
    },
  ))
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
    { path: 'users', loadChildren: () => UsersModule },
    { path: 'tasks', loadChildren: () => TasksModule },
    { path: 'moods', loadChildren: () => MoodsModule },
  ]),
))
export class AppModule {}
