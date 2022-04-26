import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, Observable } from 'rxjs';
import { FileUpload } from '../models/file-upload';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath = '/uploads';
  public urlImg = '';
  i = 0
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  pushFileToStorage(fileUpload: FileUpload) {
    Object.freeze(fileUpload);
    // = 'img ' + this.i++
    const fileUploadCopy = { ...fileUpload };
    fileUploadCopy.name = 'img ' + (this.i++).toString();
    const filePath = `${this.basePath}/${fileUploadCopy.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUploadCopy.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log('downloadURL',downloadURL)
          fileUploadCopy.url = downloadURL;
          fileUploadCopy.name = fileUpload.file.name;
          this.urlImg = downloadURL;
          this.getImgUrlFromStorage();
        });
      })
    ).subscribe((res) => {
      console.log('res',res)
   
    });
    return uploadTask.percentageChanges();
  }

  public getImgUrlFromStorage() {
    console.log('this.urlImg',this.urlImg)
    return this.urlImg;
  }

  getFiles(numberItems: any): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }
  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }
  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }
  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
