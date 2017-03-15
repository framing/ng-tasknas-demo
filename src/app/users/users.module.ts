import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { UsersComponent } from './users.component';

import { SharedModule } from '../shared/shared.module';

import { ItemDataFirebaseService, ItemFramer } from '@framing/ng-tasknas-framers';

@NgModule(Framing((framing) => framing
  .frame(new ItemFramer({ endpoint: 'users' })
    .itemDataProvider(ItemDataFirebaseService),
  )
  .imports([
    SharedModule,
  ]),
))
export class UsersModule {}
