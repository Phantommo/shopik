import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';

// płatność tylko przy niepustym koszyku
export const cartNotEmptyGuard: CanActivateFn = () =>
  inject(CartService).count() > 0 ? true : inject(Router).createUrlTree(['/cart']);

// podsumowanie tylko po złożeniu zamówienia
export const orderExistsGuard: CanActivateFn = () =>
  inject(OrderService).lastOrder() ? true : inject(Router).createUrlTree(['/']);