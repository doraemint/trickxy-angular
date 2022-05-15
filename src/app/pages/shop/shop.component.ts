import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ICart, IPrepareCart, IShop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(private router: Router, private shopService: ShopService, private afAuth: AngularFireAuth) { }
  allProduct: IShop[] = [];
  cart: IPrepareCart[] = [];
  cartForDb: IPrepareCart;
  cartLocal: any = [];
  newCartById : any = []

  productAdded = {};
  ngOnInit() {
    this.getAllProduct();
    this.getCartFromDb();
    sessionStorage.removeItem('cart');
  }

  getAllProduct() {
    this.shopService.getAllProduct().subscribe((data) => {
      this.allProduct = data;
    });
  }
  goToAddShop() {
    this.router.navigate(['/create-edit-shop'])
  }

  getCartFromDb() {
    sessionStorage.removeItem('cart');
    this.shopService.getAllCart().subscribe((dataAllCart) => {
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
        sessionStorage.setItem('cart', JSON.stringify(this.newCartById));
        return this.newCartById;
      });
    });
  }

  addToCart(product: any) {
    let defaultdataProduct = { ...product, quantity: 1 };
    this.cartLocal = JSON.parse(sessionStorage.getItem('cart')!);
    if (this.cartLocal?.length <= 0 || this.cartLocal === null) {
      this.newCartById.push(defaultdataProduct);
      sessionStorage.setItem('cart', JSON.stringify(this.newCartById));
      this.shopService.addCart(defaultdataProduct);
    }
    else {
      this.newCartById.forEach((oldDataCart: any) => {
        if (oldDataCart[defaultdataProduct.id]) {
          oldDataCart[defaultdataProduct.id].quantity++;
          sessionStorage.setItem('cart', JSON.stringify(this.newCartById));
          this.shopService.updateQuantityCartToDb(oldDataCart[defaultdataProduct.id]);

        }
        else {
          sessionStorage.setItem('cart', JSON.stringify(this.newCartById));
          this.shopService.addCart(defaultdataProduct);
        }
      });
    }
    alert('Cart added successfully');
  }
}
