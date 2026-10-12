import { Injectable } from '@angular/core';
import { Product } from '../product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly products: Product[] = [
    {
      id: 1, name: 'Klawiatura', price: 199,
      image: '/img/klawa.jpg',
      description: 'Mechaniczna klawiatura z podświetleniem RGB i przełącznikami czerwonymi.',
    },
    {
      id: 2, name: 'Mysz', price: 99,
      image: '/img/mysz.jpg',
      description: 'Bezprzewodowa mysz optyczna, 6 przycisków, bateria na 12 miesięcy.',
    },
    {
      id: 3, name: 'Monitor', price: 899,
      image: '/img/moni.jpg',
      description: 'Monitor 27" IPS, 144 Hz, rozdzielczość QHD.',
    },
    {
      id: 4, name: 'Słuchawki', price: 149,
      image: '/img/slucha.jpg',
      description: 'Słuchawki nauszne z aktywną redukcją szumów i mikrofonem.',
    },
  ];

  getAll(): Product[] {
    return this.products;
  }

  getById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}