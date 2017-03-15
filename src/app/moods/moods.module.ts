import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';
import { ItemDataFirebaseService, ItemFramer } from '@framing/ng-tasknas-framers';

import { MoodsComponent } from './moods.component';

import { SharedModule } from '../shared/shared.module';

@NgModule(Framing((framing) => framing
  .frame(new ItemFramer({ endpoint: 'moods' })
    .itemDataProvider(ItemDataFirebaseService),
  )
  .imports([
    SharedModule,
  ]),
))
export class MoodsModule {}
