import { Component } from '@angular/core';

@Component({
  selector: 'app-bar-title',
  templateUrl: './app-bar-title.component.html',
})
export class AppBarTitleComponent {
  public logoUrl: string = require('app/shared/assets/light.logo.tasknas.png');
}
