import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/OrdersService';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {
  
  public ordersService: OrdersService;
  public orders : Order[];

  constructor(ordersService: OrdersService) { 
    this.ordersService = ordersService;
    this.orders =[];
  }


  ngOnInit() {
    let observable = this.ordersService.myOrders();
    observable.subscribe(ordersList => {
      this.orders = ordersList;
      console.log(1)
      console.log(ordersList)
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
  }

}
