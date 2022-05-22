import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IPrepareCart } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private router: Router, private shopService: ShopService, private afAuth: AngularFireAuth) { }
  cart: IPrepareCart[] = [];
  newCartById: any = [];
  newData: any = [];

  subTotalPrice: number = 0;
  totalPrice: number = 0;
  shippingPrice: number = 50;
  ngOnInit(): void {
    this.getCartFromDb();
  }

  getCartFromDb() {
    sessionStorage.removeItem('mycart');
    this.shopService.getAllCart().subscribe((dataAllCart: any) => {
      this.cart = dataAllCart;
      this.getCartByUserId();
    }, error => { console.log('error'), error });
  }

  getCartByUserId() {
    this.afAuth.authState.subscribe(user => {
      this.cart.map(element => {
        if (user!.uid == element.id) {
          this.newCartById.push(element);
        }
        // else {
        //   this.newCartById = [];
        // }
        console.log('newCartById', this.newCartById)
        return this.newCartById;
      });
      this.displayCartData();
    });

  }
  displayCartData() {
    let a = this.newCartById[0];
    this.newData = Object.values(a);
    this.calculatePrice();
  }

  calculatePrice() {
    let result: number = 0;
    for (const a of this.newData) {
      if (a.price) {
        result = a.price * a.quantity;
        this.subTotalPrice += result;
      }
    }
    this.totalPrice = this.subTotalPrice + this.shippingPrice;
  }

  deleteProductById(idProduct: any) {
    this.shopService.deleteByIdProduct(this.newData[0], idProduct).finally(() => {
      this.reloadCurrentRoute();
    });
  }
  
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }

  goToCheckout(){
    this.router.navigate(['/checkout'])
  }
}
