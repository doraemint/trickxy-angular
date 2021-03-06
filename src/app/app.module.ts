import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ServiceWorkerModule } from '@angular/service-worker';

import { MenuBarComponent } from './shared/menu-bar/menu-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginRegisComponent } from './pages/login-regis/login-regis.component';
import { SpotlightComponent } from './pages/spotlight/spotlight.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { CreateEditBlogComponent } from './pages/blog/create-edit/create-edit.component';
import { CreateEditShopComponent } from './pages/shop/create-edit-shop/create-edit-shop.component';
import { CheckoutConfirmComponent } from './pages/checkout-confirm/checkout-confirm.component';
import { CheckStatusOrderComponent } from './pages/check-status-order/check-status-order.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    HomeComponent,
    LoginRegisComponent,
    SpotlightComponent,
    BlogComponent,
    ShopComponent,
    CartComponent,
    MyProfileComponent,
    CreateEditBlogComponent,
    CreateEditShopComponent,
    CheckoutConfirmComponent,
    CheckStatusOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
