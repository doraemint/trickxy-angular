import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUpload } from 'src/app/models/file-upload';
import { IShop } from 'src/app/models/shop';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-create-edit-shop',
  templateUrl: './create-edit-shop.component.html',
  styleUrls: ['./create-edit-shop.component.scss']
})
export class CreateEditShopComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;

  shopForm: FormGroup;

  filePath: string;
  data: IShop = {
    key: '',
    nameProduct: '',
    price: 0,
    fileUpload: '',
  }

  myData: any;
  uploading: boolean = false;
  constructor(
    private uploadService: FileUploadService,
    private fb: FormBuilder,
    private shopService: ShopService,
    private router: Router
  ) {
    this.shopForm = this.fb.group({
      nameProduct: ['', Validators.required],
      price: [0, Validators.required],
      fileUpload: ['', Validators.required],

    });
   }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.prepareUpload();
  }

  previewImg(file: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  prepareUpload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined!;
    this.currentFileUpload = new FileUpload(file!);
    this.previewImg(file);
  }

  uploadToDb() {
    this.data = {
      ...this.shopForm.value
    }

    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe((
      percentage) => {
      this.percentage = Math.round(percentage!);
      console.log('percentage', percentage)
    },
      error => {
        console.log(error);
      }
    );

  }

  submit() {
    this.uploadToDb();
    this.uploading = true;
    console.log('form', this.shopForm.value)
    setTimeout(() => {
      this.shopService.addNewProduct(this.data).then((res: any) => {
        console.log('add shop', res);
        this.router.navigate(['/shop']);
      });
    }, 10000)


  }

}
