import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../orders.service';
declare const $: any;

/**
 * Defines the component responsible to manage the order page.
 */
@Component({
  selector: 'order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: any;
  contactInfo = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  /**
   * Initializes a new instance of the OrderComponent class.
   *
   * @param router            The router to use.
   * @param ordersService     The order service to use.
   */
  constructor(private router: Router, private ordersService: OrdersService) { }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    this.orderForm = $('#order-form');
    $.validator.addMethod('ccexp', function(value) {
      if (!value) {
        return false;
      }
      const regEx = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-9][0-9])$/g;
      return regEx.test(value);
    }, 'La date d\'expiration de votre carte de crédit est invalide.');
    this.orderForm.validate({
      rules: {
        'phone': {
          required: true,
          phoneUS: true
        },
        'credit-card': {
          required: true,
          creditcard: true
        },
        'credit-card-expiry': {
          ccexp: true
        }
      }
    });
  }

  /**
   * Submits the order form.
   */
  submit() {
    if (!this.orderForm.valid()) {
      return;
    }
    this.ordersService.createOrder(this.contactInfo).then((order) => {

      this.router.navigate(['/confirmation', {
        name: `${order.firstName} ${order.lastName}`,
        confirmationNumber: order.id
      }]);
    });
  }
}
