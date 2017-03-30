import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { ItemDataFirebaseService, ItemFramer } from '@framing/ng-tasknas-framers';

import { SharedModule } from '../shared/shared.module';

import { ItemComponent } from './components/item.component';

@NgModule(Framing((framing) => framing
  .frame(new ItemFramer()
    .itemDataProvider(ItemDataFirebaseService)
    .model({ name: 'Tasks', endpoint: 'tasks' })
    .view({ itemComponent: ItemComponent }))
  .import(SharedModule)
  .declareAndEntryComponent(ItemComponent)))
export class TasksModule {}
