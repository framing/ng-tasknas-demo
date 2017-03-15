import { Component } from '@angular/core';

import { ShapesController } from './shapes.controller';

@Component({})
export class BaseShapesComponent {
  public constructor(
    public shapesController: ShapesController,
  ) {}
}
