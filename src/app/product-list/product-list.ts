import { Component, input, output } from '@angular/core';
import { ProductItem } from '../product-item/product-item';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  imports: [ProductItem],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  products = input.required<Product[]>();
  add = output<Product>();

  onAdd(product: Product) {
    this.add.emit(product);
  }
}