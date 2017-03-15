import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { ShapesFramer } from 'framers/shapes/shapes.framer';

@NgModule(Framing((framing) => framing
  .frame(new ShapesFramer({
    shapeName: 'Triangle',
  })),
))
export class TriangleModule {}
