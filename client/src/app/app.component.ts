import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

/**
 * Defines the main component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  readonly authors = [
    'Antoine Béland',
    'Konstantinos Lambrou-Latreille'
  ];
  shoppingCartCount = 0;

  /**
   * Initializes a new instance of the AppComponent class.
   *
   * @param shoppingCartService   The shopping cart service to use.
   */
  constructor(private shoppingCartService: ShoppingCartService) { }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    this.updateShoppingCartCount();
    this.shoppingCartService.onChanges.subscribe(() => this.updateShoppingCartCount());
  }

  /**
   * Updates the shopping cart count.
   */
  updateShoppingCartCount() {
    this.shoppingCartService.getItemsCount().then(count => this.shoppingCartCount = count);
  }
}
