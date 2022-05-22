import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './pages/blog/blog.component';
import { CreateEditBlogComponent } from './pages/blog/create-edit/create-edit.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutConfirmComponent } from './pages/checkout-confirm/checkout-confirm.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginRegisComponent } from './pages/login-regis/login-regis.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { CreateEditShopComponent } from './pages/shop/create-edit-shop/create-edit-shop.component';
import { ShopComponent } from './pages/shop/shop.component';
import { SpotlightComponent } from './pages/spotlight/spotlight.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login-register', component: LoginRegisComponent },
  { path: 'spotlight', component: SpotlightComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'create-edit-blog', component: CreateEditBlogComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'create-edit-shop', component: CreateEditShopComponent },
  { path: 'cart', component: CartComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'checkout', component: CheckoutConfirmComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
