import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShoppingCartService } from './shopping-cart.service';
import { Config } from 'app/config';

/**
 * Defines an order.
 */
export class Order {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  products: any[];
}

/**
 * Defines the service responsible to manage to orders.
 */
@Injectable()
export class OrdersService {

  /**
   * Handles the current error.
   *
   * @param error                   The error to handle.
   * @return {Promise<object>}      A promise object.
   */
  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.feedbackMessage || error);
  }

  /**
   * Initializes a new instance of the OrdersService class.
   *
   * @param http                    The HTTP service to use.
   * @param shoppingCartService     The shopping cart service to use.
   */
  constructor(private http: HttpClient, private shoppingCartService: ShoppingCartService) { }

  /**
   * Creates a new order based on the contact info specified.
   *
   * @param contactInfo             The contact info to use.
   * @return {Promise<any>}         A promise thant contains the order created.
   */
  createOrder(contactInfo: any): Promise<any> {
    return Promise.all([this.getOrders(), this.shoppingCartService.getItems()]).then(([orders, items]) => {
      contactInfo.id = orders.length + 1;
      contactInfo.products = items.map(item => {
        return {
          id: item.product.id,
          quantity: item.quantity
        };
      });
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post(`${Config.apiUrl}/orders`, JSON.stringify(contactInfo), { headers: headers })
        .toPromise()
        .then(() => {
          return this.shoppingCartService.removeAllItems().then(() => {
            return contactInfo;
          });
        })
        .catch(OrdersService.handleError);
    });
  }

  /**
   * Gets all the orders.
   *
   * @returns {Promise<Order[]>}      A promise that contains an array of orders.
   */
  getOrders(): Promise<Order[]> {
    return this.http.get(`${Config.apiUrl}/orders`)
      .toPromise()
      .then(orders => orders as Order[])
      .catch(OrdersService.handleError);
  }
}
