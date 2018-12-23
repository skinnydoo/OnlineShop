import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductsService } from '../products.service';
import { ShoppingCartService } from '../shopping-cart.service';

/**
 * Defines the component responsible to manage the product page.
 */
@Component({
  selector: 'product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  product: Product;
  productQuantity = 1;
  dialogDisplayed = false;
  interval = undefined;

  /**
   * Initializes a new instance of the ProductComponent class.
   *
   * @param route                   The active route.
   * @param productsService         The product service to use.
   * @param shoppingCartService     The shopping cart service to use.
   */
  constructor(private route: ActivatedRoute, private productsService: ProductsService,
              private shoppingCartService: ShoppingCartService) { }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productsService.getProduct(+productId).then(product => this.product = product);
  }

  /**
   * Adds the active product into the cart.
   */
  addProductToCart() {
    if (this.productQuantity <= 0) {
      this.productQuantity = 1;
    }
    this.shoppingCartService.addItem(this.product.id, this.productQuantity).then(() => {
      this.dialogDisplayed = true;
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.dialogDisplayed = false;
      }, 5000);
    });
  }
}
