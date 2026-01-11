import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from './top-menu/top-menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, TopMenuComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-inmosanvi');
}

