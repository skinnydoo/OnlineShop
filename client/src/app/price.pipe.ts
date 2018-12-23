import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formats correctly a price.
 */
@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  /**
   * Formats the specified number as a price.
   *
   * @param price         The price to format.
   * @returns {string}    The price formatted.
   */
  transform(price: number): any {
    return price.toFixed(2).replace('.', ',') + '&thinsp;$';
  }
}
