import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';
import { ItemDataFirebaseService, ItemFramer } from '@framing/ng-tasknas-framers';

import { SharedModule } from 'app/shared/shared.module';

/**
 * Example module using ItemFramer with Firebase
 */
@NgModule(Framing((framing) => framing
  .import(SharedModule)
  .frame(new ItemFramer()
    .itemDataProvider(ItemDataFirebaseService)
    .model({ endpoint: 'moods' }),
  ),
))
export class MoodsModule {}
