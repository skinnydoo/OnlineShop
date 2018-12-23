import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from 'app/shopping-cart.service';

/**
 * Defines the component responsible to manage the shopping cart page.
 */
@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  subscription: any;
  shoppingCartItems: any[];
  totalAmount: number;

  /**
   * Initializes a new instance of the ShoppingCartService class.
   *
   * @param shoppingCartService   The shopping cart service to use.
   */
  constructor(private shoppingCartService: ShoppingCartService) { }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    this.update();
    this.subscription = this.shoppingCartService.onChanges.subscribe(() => this.update());
  }

  /**
   * Occurs when the component is destroy.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Decreases the quantity for the specified item.
   *
   * @param item        The item to use.
   */
  decreaseItemQuantity(item) {
    this.shoppingCartService.updateItemQuantity(item.product.id, item.quantity - 1);
  }

  /**
   * Increases the quantity for the specified item
   *
   * @param item        The item to use.
   */
  increaseItemQuantity(item) {
    this.shoppingCartService.updateItemQuantity(item.product.id, item.quantity + 1);
  }

  /**
   * Removes the item associated with the specified product ID from the cart.
   *
   * @param productId   The product ID associated with the item to remove.
   */
  removeItemFromCart(productId) {
    if (confirm('Voulez-vous supprimer le produit du panier?')) {
      this.shoppingCartService.removeItem(productId).then(() => {});
    }
  }

  /**
   * Removes all the items from the cart.
   */
  removeAllItemsFromCart() {
    if (confirm('Voulez-vous supprimer tous les produits du panier?')) {
      this.shoppingCartService.removeAllItems().then(() => {});
    }
  }

  /**
   * Updates the shopping cart items and the total amount to display.
   */
  private update() {
    this.shoppingCartService.getItems().then(items => {
      this.shoppingCartItems = items;
      this.totalAmount = items.reduce((sum, item) => sum + item.total, 0);
    });
  }
}
