import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent], 
  template: `
    <app-navbar></app-navbar>
    <div class="p-6">
      <router-outlet></router-outlet> 
    </div>
  `,
})
export class AppComponent {}
