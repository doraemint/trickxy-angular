import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map, Observable } from 'rxjs';
import { ICart, IPrepareCart, IShop } from '../models/shop';
import { FileUploadService } from './file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private shopDbPath = '/shopData';
  private cartDbPath = '/cartData';
  shopRef: AngularFireList<any>;
  cartRef: AngularFireList<any>;

  allProduct$: Observable<any[]>;
  allCart$: Observable<any[]>;
  cart = {};
  constructor(
    private db: AngularFireDatabase,
    private fileUploadService: FileUploadService,
    public afAuth: AngularFireAuth,) {
    this.shopRef = this.db.list(this.shopDbPath);
  }
  getAllProduct() {
    this.allProduct$ = this.db.list('shopData')
      .snapshotChanges()
      .pipe(map((shopData: any[]) =>
        shopData.map(
          shopData => ({ id: shopData.key, ...shopData.payload.val() })
        )
      ));
    return this.allProduct$;
  }
  addNewProduct(shopData: IShop): any {
    shopData.fileUpload = this.fileUploadService.getImgUrlFromStorage();
    console.log('blogData', shopData)
    return this.shopRef.push(shopData);
  }
  updateBlogById(key: string, value: any): Promise<void> {
    return this.shopRef.update(key, value);
  }

  getAllCart() {
    this.allCart$ = this.db.list('cartData')
      .snapshotChanges()
      .pipe(map((allCartData: any[]) =>
        allCartData.map(
          allCartData => ({ id: allCartData.key, ...allCartData.payload.val() })
        )
      ));
    return this.allCart$;
  }

  updateCartById(key: string, value: any): Promise<void> {
    return this.cartRef.update(key, value);
  }

  addCartToDb(cart: IPrepareCart) {
    let idCart: string = cart.id!;
    this.afAuth.authState.subscribe(user => {
      this.db.database.ref('/cartData').child(user!.uid).child(idCart).update(cart);
    });
  }

  deleteByIdProduct(userId: any, idProduct: any) {
    this.cartRef = this.db.list('cartData' + '/' + (userId))
    return this.cartRef.remove(idProduct);
  }
  updateQuantityCartToDb(cart: any) {
    let idCart: string = cart.id!;
    this.afAuth.authState.subscribe(user => {
      this.db.database.ref('/cartData').child(user!.uid).child(idCart).update(cart);
    });
  }

  addCart(cart: IPrepareCart) {
    return this.addCartToDb(cart);
  }
}