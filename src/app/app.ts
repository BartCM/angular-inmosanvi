import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PropertiesPageComponent } from './properties-page/properties-page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PropertiesPageComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-inmosanvi');
}

