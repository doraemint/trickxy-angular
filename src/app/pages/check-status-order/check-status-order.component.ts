import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-check-status-order',
  templateUrl: './check-status-order.component.html',
  styleUrls: ['./check-status-order.component.scss']
})
export class CheckStatusOrderComponent implements OnInit {

  displayOrder: any;
  constructor(private fb: FormBuilder,
    private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.getOrderById();
  }

  getOrderById() {
    this.checkoutService.getOrderById().snapshotChanges().subscribe(action => {
      let orderRawData: any = action.payload.val();
      let idOrderawData = Object.keys(orderRawData);
      let listRawData = Object.values(orderRawData);
      console.log('orderRawData12', orderRawData);
      console.log('orderRawData', idOrderawData);
      console.log(' this.listOrderById', listRawData);

      this.displayOrder = listRawData.map((obj: any, index: any) => {
        let id = {
          id: idOrderawData[index]
        }

        return Object.assign(obj, id);
      });
      console.log('a', this.displayOrder)
    });
  }

}
