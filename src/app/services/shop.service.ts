import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { IShop } from '../models/shop';
import { FileUploadService } from './file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private dbPath = '/shopData';
  shopRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private fileUploadService: FileUploadService) {
    this.shopRef = this.db.list(this.dbPath);
  }
  getAllProduct() {
    this.items = this.db.list('shopData').valueChanges();
    return this.items;
  }
  addNewProduct(shopData: IShop): any {
    shopData.fileUpload = this.fileUploadService.getImgUrlFromStorage();
    console.log('blogData', shopData)
    return this.shopRef.push(shopData);
  }
  updateBlogById(key: string, value: any): Promise<void> {
    return this.shopRef.update(key, value);
  }
  deleteBlogById(key: string): Promise<void> {
    return this.shopRef.remove(key);
  }
  deleteAllBlog(): Promise<void> {
    return this.shopRef.remove();
  }
}