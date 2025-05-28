import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../shared/models/order';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
  order: IOrder

  constructor(private route: ActivatedRoute, private breadcrumbService: BreadcrumbService, private ordersService: OrdersService){
    this.breadcrumbService.set('@OrderDetails', '')
  }

  ngOnInit(): void {
    this.ordersService.getOrderDetails(this.route.snapshot.params['id']).subscribe((order: IOrder) => {
      this.order = order
      this.breadcrumbService.set('@OrderDetails', `Order# ${order.id} - ${order.status}`)
    }, error => {
      console.log(error)
    })
  }
}
