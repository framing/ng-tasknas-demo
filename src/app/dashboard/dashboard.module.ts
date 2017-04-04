import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';

/**
 * Example module not using framing
 */
@NgModule(Framing((framing) => framing
  .import(SharedModule)
  .componentAndDeclare(DashboardComponent),
))
export class DashboardModule {}
