import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map, Observable } from 'rxjs';
import { IShippingAddress } from '../models/user';
import { FileUploadService } from './file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  shippingAddressData$: any;
  userData$: any;
  orderRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase, private fileUploadService: FileUploadService, public afAuth: AngularFireAuth,) {
    this.getUserUidFromLocal();
  }

  getUserUidFromLocal() {
    this.userData$ = JSON.parse(localStorage.getItem('user')!);
    console.log('test', this.userData$)
    return this.userData$.uid;
  }

  getShippingAddressById() {
    return this.shippingAddressData$ = this.db.object('users' + '/' + this.userData$.uid + '/' + 'shippingAddress');
  }

  getCartById() {
    return this.shippingAddressData$ = this.db.object('cartData' + '/' + this.userData$.uid);
  }

  saveShippingAdress(shippingAddress: IShippingAddress) {
    this.afAuth.authState.subscribe(user => {
      this.db.database.ref('/users').child(user!.uid).child('/shippingAddress').update({
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        phoneNumber: shippingAddress.phoneNumber,
        address: shippingAddress.address,
        province: shippingAddress.province,
        zipCode: shippingAddress.zipCode
      });
    });
  }

  saveOrder(orderData: any) {
    let picTranfer = this.fileUploadService.getImgUrlFromStorage();
    orderData = {
      ...orderData,
      evidenceTranfer: picTranfer
    }
    this.orderRef = this.db.list('orders' + '/' + this.userData$.uid);
    return this.orderRef.push(orderData);
  }
}
