import { Injectable, signal } from '@angular/core';
import { map, Observable, timer } from 'rxjs';
import { Order, OrderError, OrderRequest } from '../order';

@Injectable({ providedIn: 'root' })
export class OrderService {
  readonly lastOrder = signal<Order | null>(null);

  placeOrder(request: OrderRequest): Observable<Order> {
    return timer(1200).pipe( // symulacja opóźnienia sieci
      map(() => {
        const r = Math.random();
        if (r < 0.1) {
          throw { message: 'Płatność została odrzucona. Spróbuj ponownie.', fatal: false } satisfies OrderError;
        }
        if (r < 0.15) {
          throw { message: 'Błąd serwera. Zamówienie nie zostało zapisane.', fatal: true } satisfies OrderError;
        }
        const order: Order = {
          ...request,
          id: Math.floor(100000 + Math.random() * 900000),
          createdAt: new Date(),
        };
        this.lastOrder.set(order);
        return order;
      })
    );
  }
}