import { Component, Host } from '@angular/core';
import { ListItemDirective } from '@framing/ng-tasknas-framers';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
})
export class ItemComponent {
  constructor(
    @Host() public listItem: ListItemDirective,
  ) {}
}
