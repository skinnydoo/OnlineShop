import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formats a number with fixed width.
 */
@Pipe({
  name: 'pad'
})
export class PadPipe implements PipeTransform {

  /**
   * Pads a number with zeros or a specified symbol.
   *
   * @param value         The number to format.
   * @param [width]       The total width of the formatted number. By default, the width is set to 5.
   * @param [symbol]      The padding symbol to use. By default, the symbol is '0'.
   * @returns {string}    The formatted number.
   *
   * @see https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
   */
  transform(value: number, width: number = 5, symbol: string = '0'): string {
    const valueStr = value + '';
    return valueStr.length >= width ? valueStr : new Array(width - valueStr.length + 1).join(symbol) + valueStr;
  }

}
