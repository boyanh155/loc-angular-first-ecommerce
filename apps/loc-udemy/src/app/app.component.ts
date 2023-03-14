import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'loc-angular-root',
  templateUrl: './app.component.html',
  encapsulation:ViewEncapsulation.None,
})
export class AppComponent {
  title = 'loc-udemy';
}
