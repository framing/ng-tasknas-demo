import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { Framing, FramingComponentOutletModule, FramingContainerOutletModule } from '@framing/ng-core';
import { SharedModule as FramersSharedModule } from '@framing/ng-tasknas-framers';
import { MomentModule } from 'angular2-moment';

@NgModule(Framing((framing) => framing
  .importsAndExports([
    MaterialModule,
    MomentModule,
    FramersSharedModule,
    FramingComponentOutletModule,
    FramingContainerOutletModule,
  ]),
))
export class SharedModule {}
