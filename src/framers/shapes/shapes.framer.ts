import { Type } from '@angular/core';
import { Framer, Framing, FramingNgModule } from '@framing/ng-core';

import { ShapesController } from './shapes.controller';

import { ShapesModel } from './shapes.model';

import { ShapesView } from './shapes.view';

import { ShapesComponentsModule } from './components/shapes-components.module';

import { ShapesComponent } from './components/shapes.component';

import { TopComponent } from './components/top.component';

export class ShapesFramer extends Framer<ShapesModel, ShapesView> {

  public get framerName(): string { return 'Shapes'; }

  public get defaultModel(): ShapesModel {
    return {
      shapeName: 'Shape',
      alertMessage: 'Shapes are awesome!',
      yo: 'yo',
    };
  }

  public get defaultView(): ShapesView {
    return {
      shapesComponent: ShapesComponent,
      topComponent: TopComponent,
    };
  }

  public get defaultController(): Type<ShapesController> {
    return ShapesController;
  }

  public frame(framing: FramingNgModule): void {
    framing
    .import(ShapesComponentsModule)
    .component(this.theView.shapesComponent);
  }
}
