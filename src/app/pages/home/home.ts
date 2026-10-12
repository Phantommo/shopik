import { Component, inject } from '@angular/core';
import { ProductList } from '../../product-list/product-list';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  imports: [ProductList],
  templateUrl: './home.html',
})
export class Home {
  protected products = inject(ProductService).getAll();
  protected cart = inject(CartService);
}