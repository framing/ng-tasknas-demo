import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';

@NgModule(Framing((framing) => framing
  .route()
  .imports([
    SharedModule,
  ])
  .componentAndDeclare(DashboardComponent),
))
export class DashboardModule {}
