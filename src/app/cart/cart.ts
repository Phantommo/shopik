import { Component, inject, input, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  protected cart = inject(CartService);
  private router = inject(Router);

  compact = input(false);   // true w popupie: dodatkowy link „Zobacz koszyk”
  readonly = input(false);  // true na stronie płatności: bez przycisków
  navigated = output<void>(); // informuje rodzica, że użytkownik poszedł dalej

  goToCheckout() {
    this.router.navigate(['/checkout']);
    this.navigated.emit();
  }
}