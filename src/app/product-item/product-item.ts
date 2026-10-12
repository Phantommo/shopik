import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../product';

@Component({
  selector: 'app-product-item',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem {
  product = input.required<Product>();
  add = output<Product>();

  onAddClick() {
    this.add.emit(this.product());
  }
}