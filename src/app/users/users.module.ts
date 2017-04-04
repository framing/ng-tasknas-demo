import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { SharedModule } from '../shared/shared.module';

import { ItemDataFirebaseService, ItemFramer } from '@framing/ng-tasknas-framers';

/**
 * Example module using ItemFramer with Firebase
 */
@NgModule(Framing((framing) => framing
  .import(SharedModule)
  .frame(new ItemFramer()
    .itemDataProvider(ItemDataFirebaseService)
    .model({ endpoint: 'users' }),
  ),
))
export class UsersModule {}
