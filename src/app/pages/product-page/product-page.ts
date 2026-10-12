import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { register } from 'swiper/element/bundle';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

register();

@Component({
  selector: 'app-product-page',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage {
  private products = inject(ProductService);
  protected cart = inject(CartService);

  id = input.required<string>();

  product = computed(() => this.products.getById(Number(this.id())));

  others = computed(() =>
    this.products.getAll().filter(p => p.id !== this.product()?.id)
  );

  breakpoints = {
    600: { slidesPerView: 2 },
    900: { slidesPerView: 2.5 },
  };

  origin = signal('50% 50%');

  onMove(e: MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    this.origin.set(`${x}% ${y}%`);
  }
}
