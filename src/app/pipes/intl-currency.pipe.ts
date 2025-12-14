import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intlCurrency',
  standalone: true,
  pure: true
})
export class IntlCurrencyPipe implements PipeTransform {

  transform(
    value: number,
    currency: string = 'EUR',
    language: string = 'es-ES',
    maximumFractionDigits: number = 0
  ): string {

    if (value == null) return '';

    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency,
      maximumFractionDigits
    }).format(value);
  }
}
