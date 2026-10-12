import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { Cart } from '../cart/cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule,
    MatIconModule, MatBadgeModule, MatMenuModule, Cart,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected cart = inject(CartService);
}