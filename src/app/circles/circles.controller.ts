import { Injectable, Injector } from '@angular/core';

import { ShapesController } from 'framers/shapes/shapes.controller';

@Injectable()
export class CirclesController extends ShapesController {

  public handleAlert(): void {}
}
