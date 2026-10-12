import { computed, inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private snack = inject(MatSnackBar);

  readonly items = signal<CartItem[]>([]);
  readonly count = computed(() => this.items().reduce((s, i) => s + i.quantity, 0));
  readonly total = computed(() =>
    this.items().reduce((s, i) => s + i.product.price * i.quantity, 0)
  );

  add(product: Product) {
    this.items.update(items =>
      items.some(i => i.product.id === product.id)
        ? items.map(i => (i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...items, { product, quantity: 1 }]
    );
    this.snack.open(`Dodano do koszyka: ${product.name}`, 'OK', { duration: 2000 });
  }

  increase(id: number) {
    this.changeQuantity(id, 1);
  }

  decrease(id: number) {
    this.changeQuantity(id, -1);
  }

  remove(id: number) {
    this.items.update(items => items.filter(i => i.product.id !== id));
  }

  clear() {
    this.items.set([]);
  }

  private changeQuantity(id: number, delta: number) {
    this.items.update(items =>
      items
        .map(i => (i.product.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter(i => i.quantity > 0)
    );
  }
}