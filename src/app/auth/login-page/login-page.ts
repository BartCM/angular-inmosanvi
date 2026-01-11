import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
  host: {
    class: 'grow flex items-center justify-center',
  },
})
export class LoginPageComponent {

  private router = inject(Router);
  private title = inject(Title);

  constructor() {
    this.title.setTitle('Login page');
  }

  onSubmit() {
    // NO login real, solo navegación
    this.router.navigate(['/properties']);
  }
}