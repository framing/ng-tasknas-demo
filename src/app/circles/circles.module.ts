import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { ShapesFramer } from 'framers/shapes/shapes.framer';

import { CirclesController } from './circles.controller';

@NgModule(Framing((framing) => framing
  .frame(new ShapesFramer()
    .model({ shapeName: 'Circle', yo: 'hey' })
    .controller(CirclesController),
  ),
))
export class CirclesModule {}
