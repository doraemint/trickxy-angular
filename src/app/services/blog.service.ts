import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map, Observable } from 'rxjs';
import { IBlog } from '../models/blog';
import { FileUploadService } from './file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private dbPath = '/blogData';
  blogRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private fileUploadService: FileUploadService) {
    this.blogRef = this.db.list(this.dbPath);
  }
  getAllBlog() {
    // return this.db.list('/blogData').snapshotChanges().pipe(
    //   map((products: any[]) => products.map(prod => {
    //     const payload = prod.payload.val();
    //     const key = prod.key;
    //     return <any>{ key, ...payload };
    //   })),
    // )
    this.items = this.db.list('blogData').valueChanges();
    return this.items;
  }
  createNewBlog(blogData: IBlog): any {
    blogData.fileUpload = this.fileUploadService.getImgUrlFromStorage();
    console.log('blogData', blogData)
    return this.blogRef.push(blogData);
  }
  updateBlogById(key: string, value: any): Promise<void> {
    return this.blogRef.update(key, value);
  }
  deleteBlogById(key: string): Promise<void> {
    return this.blogRef.remove(key);
  }
  deleteAllBlog(): Promise<void> {
    return this.blogRef.remove();
  }


}
