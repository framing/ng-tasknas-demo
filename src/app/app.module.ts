import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';
import { AppFramer } from '@framing/ng-tasknas-framers';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { SharedModule } from './shared/shared.module';

import { DashboardModule } from './dashboard/dashboard.module';
import { MoodsModule } from './moods/moods.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

import { AppBarTitleComponent } from './view/app-bar-title.component';
import { AppViewModule } from './view/app-view.module';

/**
 * Example module using AppFramer with Firebase
 */
@NgModule(Framing((framing) => framing
  .imports([
    AngularFireModule.initializeApp(require('../../firebase.config.json')),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppViewModule,
  ])
  .frame(new AppFramer()
    .model({
      /**
       * Override default AppFramer config
       * @see https://github.com/framing/ng-framing/blob/master/packages/ng-tasknas-framers/src/app/app.model.ts
       */
      title: 'Tasknas',
      sideNavItems: [
        { routerLink: '/dashboard', label: 'Dashboard' },
        { routerLink: '/tasks', label: 'Tasks' },
        { routerLink: '/moods', label: 'Moods' },
        { routerLink: '/users', label: 'Users' },
      ],
    })
    .view({
      /**
       * Override default AppFramer view components
       * @see https://github.com/framing/ng-framing/blob/master/packages/ng-tasknas-framers/src/app/app.view.ts
       */
      appBarTitleComponent: AppBarTitleComponent,
    }),
  )
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
