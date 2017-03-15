import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { ItemDataFirebaseService, ItemFramer } from '@framing/ng-tasknas-framers';

import { SharedModule } from '../shared/shared.module';

import { ItemComponent } from './components/item.component';

@NgModule(Framing((framing) => framing
  .frame(new ItemFramer(
    { name: 'Tasks', endpoint: 'tasks' },
    { itemComponent: ItemComponent })
    .itemDataProvider(ItemDataFirebaseService),
  )
  .imports([
    SharedModule,
  ])
  .declareAndEntryComponent(ItemComponent),
))
export class TasksModule {}
