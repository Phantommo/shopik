import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { startWith } from 'rxjs';
import { Cart } from '../../cart/cart';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { OrderError, PaymentMethod } from '../../order';

@Component({
  selector: 'app-checkout',
  imports: [
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatRadioModule,
    MatButtonModule, MatIconModule, MatProgressSpinnerModule, Cart,
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snack = inject(MatSnackBar);
  private orders = inject(OrderService);
  protected cart = inject(CartService);

  form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    postalCode: ['', [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)]],
    city: ['', Validators.required],
    paymentMethod: this.fb.nonNullable.control<PaymentMethod>('card'),
    cardNumber: [''],
    blikCode: [''],
  });

  

  method = toSignal(this.form.controls.paymentMethod.valueChanges, { initialValue: 'card' as PaymentMethod });
  submitting = signal(false);
  errorMessage = signal<string | null>(null);

  private messages: Record<string, string> = {
    required: 'To pole jest wymagane',
    email: 'Niepoprawny adres e-mail',
    minlength: 'Wpisz co najmniej 2 znaki',
    pattern: 'Niepoprawny format',
  };

  constructor() {
    // walidatory pól płatności zależą od wybranej metody
    this.form.controls.paymentMethod.valueChanges
      .pipe(startWith(this.form.controls.paymentMethod.value), takeUntilDestroyed())
      .subscribe(method => this.updatePaymentValidators(method));
  }

  errorOf(name: string): string {
    const errors = this.form.get(name)?.errors;
    const key = errors && Object.keys(errors)[0];
    return key ? this.messages[key] : '';
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);
    const v = this.form.getRawValue();

    this.orders
      .placeOrder({
        customer: {
          firstName: v.firstName, lastName: v.lastName, email: v.email,
          address: v.address, postalCode: v.postalCode, city: v.city,
        },
        items: this.cart.items(),
        total: this.cart.total(),
        paymentMethod: v.paymentMethod,
      })
      .subscribe({
        next: () => {
          this.cart.clear();
          this.router.navigate(['/order-summary']);
        },
        error: (err: OrderError) => {
          this.submitting.set(false);
          if (err.fatal) {
            this.router.navigate(['/error'], { state: { message: err.message } }); // strona błędu
          } else {
            this.errorMessage.set(err.message);                                    // inline
            this.snack.open(err.message, 'Zamknij', { duration: 5000 });           // toast
          }
        },
      });
  }

  private updatePaymentValidators(method: PaymentMethod) {
    const { cardNumber, blikCode } = this.form.controls;
    cardNumber.clearValidators();
    blikCode.clearValidators();

    if (method === 'card') {
      cardNumber.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
    }
    if (method === 'blik') {
      blikCode.setValidators([Validators.required, Validators.pattern(/^\d{6}$/)]);
    }

    cardNumber.updateValueAndValidity();
    blikCode.updateValueAndValidity();
  }
}