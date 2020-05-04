import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from '../components/main/main.component'
import { CustomerComponent } from '../components/customer/customer.component';
import { AdminComponent } from '../components/admin/admin.component';
import { InsertComponent } from '../components/insert/insert.component';
import { UpdateComponent } from '../components/update/update.component';
import { DeleteComponent } from '../components/delete/delete.component';
import { FormsModule } from '@angular/forms';
import { ProdUpdateComponent } from '../components/prod-update/prod-update.component'; 
import { ProdAddComponent } from '../components/prod-add/prod-add.component';

const routes: Routes = [
    { 
        path: "Admin", component: AdminComponent, children:[
            { path: "insert", component: InsertComponent },
            { path: "update", component: UpdateComponent },
            { path: "delete", component: DeleteComponent },
            { path: "Updateproducts", component: ProdUpdateComponent },
            { path: "CreateProduct", component: ProdAddComponent },
            { path: "", redirectTo: "insert", pathMatch: "full" }
        ]
    }
];

@NgModule({
    declarations: [ AdminComponent,
        InsertComponent,
        UpdateComponent,
        DeleteComponent,
        ProdUpdateComponent,
        ProdAddComponent],
    imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild(routes) // Importing the above routes
  ]
  })
export class AdminModule {

 }
