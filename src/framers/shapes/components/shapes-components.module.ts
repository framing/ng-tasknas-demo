import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { ShapesComponent } from './shapes.component';
import { TopComponent } from './top.component';

@NgModule(Framing((framing) => framing
  .declarationsAndEntryComponents([
    ShapesComponent,
    TopComponent,
  ]),
))
export class ShapesComponentsModule {}
