import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from '../components/customer/customer.component';
import { FormsModule } from '@angular/forms';
import { BakeryComponent } from '../components/bakery/bakery.component';
import { DairyComponent } from '../components/dairy/dairy.component';
import { FruitsComponent } from '../components/fruits/fruits.component'; 
import { MeatComponent } from '../components/meat/meat.component';
import { VegitablesComponent } from '../components/vegitables/vegitables.component';
import { WinesandbeersComponent } from '../components/winesandbeers/winesandbeers.component';
import { AllproductsComponent } from '../components/allproducts/allproducts.component';
import { ProductsPipeByName } from '../pipes/ProductsPipeByName';

const routes: Routes = [
    { 
        path: "Products", component: CustomerComponent, children:[
            { path: "Allproducts", component: AllproductsComponent },
            { path: "Bakery", component: BakeryComponent },
            { path: "Dairy", component: DairyComponent },
            { path: "Fruits", component: FruitsComponent },
            { path: "Meat", component: MeatComponent },
            { path: "Vegitables", component: VegitablesComponent },
            { path: "Wines & Beers", component: WinesandbeersComponent },
            { path: "", redirectTo: "Allproducts", pathMatch: "full" }
        ]
    }
];

@NgModule({
    declarations: [ CustomerComponent,
        BakeryComponent,
        MeatComponent,
        DairyComponent,
        VegitablesComponent,
        FruitsComponent,
        WinesandbeersComponent,
        ProductsPipeByName,
        AllproductsComponent],
    imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild(routes) // Importing the above routes
  ]
  })
export class ProductsModule {

}
