import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(value, args?) {
    // ES6 array destructuring
    let [priceMin, priceMax] = args;
    
    if (priceMin) {
      return value.filter(_priceMin => {
        return _priceMin.value >= +_priceMin;
      });
    }
    
    if (priceMax) {
      return value.filter(_priceMax => {
        return _priceMax.value <= +priceMax;
      });
    }
  }

}
