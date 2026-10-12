import { Routes } from '@angular/router';
import { cartNotEmptyGuard, orderExistsGuard } from './guards';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Sklep',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'product/:id',
    title: 'Produkt',
    loadComponent: () => import('./pages/product-page/product-page').then(m => m.ProductPage),
  },
  {
    path: 'cart',
    title: 'Koszyk',
    loadComponent: () => import('./pages/cart-page/cart-page').then(m => m.CartPage),
  },
  {
    path: 'checkout',
    title: 'Płatność',
    canActivate: [cartNotEmptyGuard],
    loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout),
  },
  {
    path: 'order-summary',
    title: 'Podsumowanie zamówienia',
    canActivate: [orderExistsGuard],
    loadComponent: () => import('./pages/order-summary/order-summary').then(m => m.OrderSummary),
  },
  {
    path: 'error',
    title: 'Błąd',
    loadComponent: () => import('./pages/error-page/error-page').then(m => m.ErrorPage),
  },
  { path: '**', redirectTo: '' },
];