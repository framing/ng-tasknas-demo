import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { ShapesFramer } from 'framers/shapes/shapes.framer';

import { SquaresTopComponent } from './squares-top.component';

@NgModule(Framing((framing) => framing
  .declarationAndEntryComponent(SquaresTopComponent)
  .frame(new ShapesFramer()
    .model({
      shapeName: 'Square',
      alertMessage: 'Squares are the best!',
    })
    .view({ shapesComponent: SquaresTopComponent })),
))
export class SquaresModule {}
