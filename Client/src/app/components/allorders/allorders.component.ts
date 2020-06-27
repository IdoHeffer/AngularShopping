import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/OrdersService';
import { Order } from 'src/app/models/Order';
import { CartData } from 'src/app/models/CartData';
import { CartsService } from 'src/app/services/CartsService';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {
  
  public ordersService: OrdersService;
  public orders : Order[];
  public itemsInOrders : CartData[];

  constructor(ordersService: OrdersService,private cartsService: CartsService) { 
    this.ordersService = ordersService;
    this.orders =[];
  }


  ngOnInit() {
    // on load getting the user's history of orders.
    let observable = this.ordersService.myOrders();
    observable.subscribe(ordersList => {
      this.orders = ordersList;
      console.log(1)
      console.log(ordersList)
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
  }

  // function that is being called after clicking one of the orders to see the order content.
  public getItemsInOrder(cartID : number){
    const observableCart = this.ordersService.closedOrdersItems(cartID);

    observableCart.subscribe(userCartItemsFromServer => {
      this.itemsInOrders = userCartItemsFromServer;
      if (this.itemsInOrders ==[]){
        this.itemsInOrders =[];
      }
      console.log(this.itemsInOrders);
     console.log(userCartItemsFromServer);
    }, error => {
      return console.log(error);
    });
    
  }
  
}