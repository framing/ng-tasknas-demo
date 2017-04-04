import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';
import { ItemFramer } from '@framing/ng-tasknas-framers';

import { SharedModule } from 'app/shared/shared.module';

/**
 * Example module using ItemFramer with a static list
 */
@NgModule(Framing((framing) => framing
  .import(SharedModule)
  .frame(new ItemFramer()
    .model({
      items: [
        { label: 'Do laundry' },
        { label: 'Clean dishes' },
        { label: 'Wash car' },
      ],
    }),
  ),
))
export class TasksModule {}
