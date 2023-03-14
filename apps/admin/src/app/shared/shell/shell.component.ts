import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'admin-shell',
  templateUrl: './shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {}
