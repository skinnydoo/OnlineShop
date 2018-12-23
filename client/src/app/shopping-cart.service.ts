import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config} from './config';
import { ProductsService } from './products.service';

/**
 * Defines a shopping cart item.
 */
class ShoppingCartItem {
  productId: number;
  quantity: number;
}

/**
 * Defines the service responsible to manage the shopping cart.
 */
@Injectable()
export class ShoppingCartService {

  private shoppingCartPromise: Promise<ShoppingCartItem[]>;
  private onChangesEvent: EventEmitter<any> = new EventEmitter();

  /**
   * Occurs when the shopping cart changes.
   */
  get onChanges(): EventEmitter<any> {
    return this.onChangesEvent;
  }

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
   * Initializes a new instance of the ShoppingCartService class.
   *
   * @param http                The HTTP service to use.
   * @param productsService     The products service to use.
   */
  constructor(private http: HttpClient, private productsService: ProductsService) { }

  /**
   * Adds an item in the shopping cart.
   *
   * @param productId           The ID associated with the product to add.
   * @param [quantity]          The quantity of the product.
   * @return {Promise<any>}     An empty promise.
   */
  addItem(productId: number, quantity: number = 1): Promise<any> {
    return this.retrieveItemsFromAPI().then(items => {
      const itemFound = items.find(i => i.productId === productId);
      if (!itemFound) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: headers, withCredentials: true };
        this.shoppingCartPromise = undefined;

        return this.http.post(`${Config.apiUrl}/shopping-cart`, JSON.stringify({
          productId: productId,
          quantity: quantity
        }), options)
          .toPromise()
          .then(() => this.onChangesEvent.emit())
          .catch(ShoppingCartService.handleError);
      } else {
        return this.updateItemQuantity(productId, itemFound.quantity + quantity);
      }
    });
  }

  /**
   * Gets the items in the shopping cart.
   *
   * @returns {Promise<any>}    A promise that contains the list of items in the shopping cart.
   */
  getItems(): Promise<any> {
    return Promise.all([this.productsService.getProducts('alpha-asc'), this.retrieveItemsFromAPI()])
      .then(([products, items]) => {
        function getItemAssociatedWithProduct(productId) {
          return items.find(item => {
            return item.productId === productId;
          });
        }
        return products.filter(product => getItemAssociatedWithProduct(product.id) !== undefined)
          .map(product => {
            const item = getItemAssociatedWithProduct(product.id);
            return {
              product: product,
              quantity: item.quantity,
              total: product.price * item.quantity
            };
          });
      });
  }

  /**
   * Gets the items count in the shopping cart.
   *
   * @returns {Promise<number>}    A promise that contains the items count.
   */
  getItemsCount(): Promise<number> {
    return this.retrieveItemsFromAPI().then(items => items.reduce((sum, item) => sum + +item.quantity, 0));
   }

  /**
   * Updates the quantity associated with a specified item.
   *
   * @param productId         The product ID associated with the item to update.
   * @param quantity          The item quantity.
   * @return {Promise<any>}   An empty promise.
   */
  updateItemQuantity(productId: number, quantity: number): Promise<any> {
    this.shoppingCartPromise = undefined;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers, withCredentials: true };
    return this.http.put(`${Config.apiUrl}/shopping-cart/${productId}`, JSON.stringify({
      quantity: quantity
    }), options)
      .toPromise()
      .then(() => this.onChangesEvent.emit())
      .catch(ShoppingCartService.handleError);
  }

  /**
   * Removes the specified item in the shopping cart.
   *
   * @param productId         The product ID associated with the item to remove.
   * @return {Promise<any>}   An empty promise.
   */
  removeItem(productId: number): Promise<any> {
    this.shoppingCartPromise = undefined;
    return this.http.delete(`${Config.apiUrl}/shopping-cart/${productId}`, {
      withCredentials: true
    }).toPromise()
      .then(() => this.onChangesEvent.emit())
      .catch(ShoppingCartService.handleError);
  }

  /**
   * Removes all the items in the shopping cart.
   *
   * @return {Promise<any>}   An empty promise.
   */
  removeAllItems(): Promise<any> {
    this.shoppingCartPromise = undefined;
    return this.http.delete(`${Config.apiUrl}/shopping-cart/`, {
      withCredentials: true
    }).toPromise()
      .then(() => this.onChangesEvent.emit())
      .catch(ShoppingCartService.handleError);
  }

  /**
   * Retrieves the items in the shopping cart from the API.
   *
   * @return {Promise<ShoppingCartItem[]>}     A promise that contains the items list.
   * @private
   */
  private retrieveItemsFromAPI(): Promise<ShoppingCartItem[]> {
    if (!this.shoppingCartPromise) {
      this.shoppingCartPromise = this.http.get(`${Config.apiUrl}/shopping-cart`, {
        withCredentials: true
      }).toPromise()
        .then(products => products as ShoppingCartItem[])
        .catch(ShoppingCartService.handleError);
    }
    return this.shoppingCartPromise;
  }
}
