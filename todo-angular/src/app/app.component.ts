import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <section class="todoapp">
      <router-outlet></router-outlet>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
    </footer>
  `,
})
export class AppComponent {}
