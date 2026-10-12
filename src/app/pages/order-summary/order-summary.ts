import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../services/order.service';
import { PaymentMethod } from '../../order';

@Component({
  selector: 'app-order-summary',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.scss',
})
export class OrderSummary {
  protected order = inject(OrderService).lastOrder;

  protected labels: Record<PaymentMethod, string> = {
    card: 'Karta',
    blik: 'BLIK',
    transfer: 'Przelew',
  };
}