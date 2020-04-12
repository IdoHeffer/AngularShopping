import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/Product';

@Pipe({
    name: 'minPricePipe'
})
export class ProductsPipeByMinPrice implements PipeTransform {

    transform(products: Product[], minPrice:number): any {

        // Filter is very similary forEach
        // Filter automaticallty goes through each item in the array, sends it to a predicate
        // A predicate is a big word to a "condition". If the predicate returns true -> 
        // the item enters to the filtered array, if false --> the item will not be in the filtered array.
        //-----------
        // In this example we filter all coupons whose price is about 350
        return products.filter(product => product.Price > minPrice);
    }
}
