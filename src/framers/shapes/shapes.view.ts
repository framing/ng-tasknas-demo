import { Type } from '@angular/core';

import { BaseShapesComponent } from './base-shapes.component';

export interface ShapesView {
  shapesComponent?: Type<BaseShapesComponent>;

  topComponent?: Type<BaseShapesComponent>;
}
