import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'src/app/models/file-upload';
import { IShippingAddress } from 'src/app/models/user';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-checkout-confirm',
  templateUrl: './checkout-confirm.component.html',
  styleUrls: ['./checkout-confirm.component.scss']
})
export class CheckoutConfirmComponent implements OnInit {

  shippingForm: FormGroup;

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;

  filePath: string;
  shippingData: IShippingAddress;
  isEditingAddress: boolean;

  cartData: any[];
  subTotalPrice: number = 0;
  totalPrice: number = 0;
  shippingPrice: number = 50;

  showPayment: boolean = false;
  constructor(
    private fb: FormBuilder,
    private uploadService: FileUploadService,
    private checkoutService: CheckoutService) {

  }

  ngOnInit(): void {
    this.setFormShipping();
    this.getShippingAddress();
  }

  setFormShipping() {
    this.shippingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      province: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }

  getShippingAddress() {
    this.checkoutService.getShippingAddressById().snapshotChanges().subscribe(action => {
      let shippingRawData: any = action.payload.val();
      console.log('shippingRawData', shippingRawData);
      if (shippingRawData != null) {
        this.shippingData = {
          ...shippingRawData
        };
        this.shippingForm.patchValue({ ...this.shippingData });
        this.shippingForm.disable();
        this.isEditingAddress = false;
        this.getCartById();
      } else {
        this.shippingForm.enable();
        this.isEditingAddress = true;
      }
    });
  }

  editShippingAddress() {
    this.isEditingAddress = true;
    this.shippingForm.enable();
  }

  getCartById() {
    this.checkoutService.getCartById().valueChanges().subscribe(action => {
      console.log('a', action)
      let rawData: any = action
      this.cartData = Object.values(rawData);
      this.calculatePrice();
    });
  }

  calculatePrice() {
    let result: number = 0;
    for (const a of this.cartData) {
      result = a.price * a.quantity;
      this.subTotalPrice += result;
    }
    this.totalPrice = this.subTotalPrice + this.shippingPrice;
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.prepareUpload();
  }

  previewImg(file: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(file)
  }

  prepareUpload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined!;
    this.currentFileUpload = new FileUpload(file!);
    this.previewImg(file);
  }

  uploadToDb() {
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

  saveAddress() {
    this.shippingData = {
      ...this.shippingForm.value
    }
    this.checkoutService.saveShippingAdress(this.shippingData);
    this.getShippingAddress();
  }

  submit() {
    this.uploadToDb();
    setTimeout(() => {
      let orderData = {
        address : this.shippingData,
        detailOrder: this.cartData,
        totalPrice : this.totalPrice,
        status : 'wating for check'
      }
      this.checkoutService.saveOrder(orderData).then((res) => {
        alert("Purchase of order successfully! Please Check in 'Status of order' menu.")
      });
    }, 5000);
  }
}

