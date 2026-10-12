import { Component } from '@angular/core';
import { Cart } from '../../cart/cart';

@Component({
  selector: 'app-cart-page',
  imports: [Cart],
  template: `<app-cart />`,
  styles: `:host { display: block; max-width: 700px; margin: 0 auto; }`,
})
export class CartPage {}