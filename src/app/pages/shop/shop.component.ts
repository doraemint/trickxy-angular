import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IShop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(private router: Router,private shopService: ShopService) { }

  allProduct : IShop[] = [];
  ngOnInit() {
    this.getAllBlog();
  }

  getAllBlog() {
    this.shopService.getAllProduct().subscribe((data) => {
      this.allProduct = data;
      console.log('getAllProduct',this.allProduct)
    });
    //
  }
  goToAddShop() {
    this.router.navigate(['/create-edit-shop'])
  }
}
