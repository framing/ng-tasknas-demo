import { Injectable, Injector } from '@angular/core';
import { Controller } from '@framing/ng-core';

import { ShapesModel } from './shapes.model';
import { ShapesView } from './shapes.view';

@Injectable()
export class ShapesController extends Controller<ShapesModel, ShapesView> {

  public handleAlert(): void {
    window.alert(this.model.alertMessage);
  }
}
