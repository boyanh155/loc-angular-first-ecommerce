import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-slider',
  templateUrl: './slider.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent {

}
