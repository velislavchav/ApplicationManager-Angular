import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html'
})
export class MoreInfoComponent {
  @Input() moreInfo;
}
