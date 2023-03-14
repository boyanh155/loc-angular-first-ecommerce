import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'admin-root',
  templateUrl: './app.component.html',
  encapsulation:ViewEncapsulation.None
})
export class AppComponent {
  title = 'admin';
}
