import { Component, OnInit } from '@angular/core';
import { ProductsService, Product } from '../products.service';

/**
 * Defines the component responsible to manage the display of the products page.
 */
@Component({
  selector: 'products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: Product[];
  activeCategory = 'all';
  activeSortingCriteria = 'price-asc';

  /**
   * Initializes a new instance of the ProductsComponent class.
   *
   * @param productsService   The products service to use.
   */
  constructor(private productsService: ProductsService) { }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    this.updateProducts();
  }

  /**
   * Applies a category to the products list.
   *
   * @param category          The category to apply.
   */
  applyCategory(category) {
    this.activeCategory = category;
    this.updateProducts();
  }

  /**
   * applies a sorting criteria to the products list.
   *
   * @param sortingCriteria   The sorting criteria to apply.
   */
  applySortingCriteria(sortingCriteria) {
    this.activeSortingCriteria = sortingCriteria;
    this.updateProducts();
  }

  /**
   * Updates the products list.
   */
  private updateProducts() {
    this.productsService.getProducts(this.activeSortingCriteria, this.activeCategory)
      .then(products => this.products = products);
  }
}
