import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-page',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    <mat-icon>error_outline</mat-icon>
    <h1>Coś poszło nie tak</h1>
    <p>{{ message }}</p>
    <a mat-flat-button routerLink="/cart">Wróć do koszyka</a>
  `,
  styles: `
    :host { display: block; text-align: center; padding: 3rem 1rem; }
    mat-icon { font-size: 64px; width: 64px; height: 64px; color: var(--danger); }
  `,
})
export class ErrorPage {
  message: string = history.state?.message ?? 'Wystąpił nieoczekiwany błąd.';
}