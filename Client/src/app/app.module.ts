import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { ItemsService } from './items.service';
import { ItemsComponent } from './items/items.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { AdminTokenInterceptorService } from './admin-token-interceptor.service';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { CartItemsService } from './cart-items.service';
import { SingleProductComponent } from './single-product/single-product.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material/material.module';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserComponent } from './user/user.component';
import { AdminSidenavComponent } from './admin/admin-sidenav/admin-sidenav.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { SellerlistComponent } from './admin/sellerlist/sellerlist.component';
import { ItemsListComponent } from './admin/items-list/items-list.component';
import { NewItemComponent } from './admin/new-item/new-item.component';
import { UpdateItemComponent } from './admin/update-item/update-item.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CategoryListComponent } from './admin/category-list/category-list.component';
import { OrderComponent } from './order/order.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { OrderService } from './order.service';
import { SellerHeaderComponent } from './seller/seller-header/seller-header.component';
import { SellerSidenavComponent } from './seller/seller-sidenav/seller-sidenav.component';
import { SellerLoginComponent } from './seller/seller-login/seller-login.component';
import { SellerRegisterComponent } from './seller/seller-register/seller-register.component';
import { SellerHomeComponent } from './seller/seller-home/seller-home.component';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { SellerAuthGuard } from './seller-auth.guard';
import { SellerTokenInterceptorService } from './seller-token-interceptor.service';
import { SellerOrdersComponent } from './seller/seller-orders/seller-orders.component';
import { SellerItemsComponent } from './seller/seller-items/seller-items.component';
import { SellerNewItemsComponent } from './seller/seller-new-items/seller-new-items.component';
import { SellerUpdateComponent } from './seller/seller-update/seller-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemsComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    CartComponent,
    SingleProductComponent,
    SidenavComponent,
    HeaderComponent,
    AdminHomeComponent,
    AdminHeaderComponent,
    UserComponent,
    AdminSidenavComponent,
    AdminLoginComponent,
    SellerlistComponent,
    ItemsListComponent,
    NewItemComponent,
    UpdateItemComponent,
    AdminDashboardComponent,
    CategoryListComponent,
    OrderComponent,
    AdminOrdersComponent,
    SellerHeaderComponent,
    SellerSidenavComponent,
    SellerLoginComponent,
    SellerRegisterComponent,
    SellerHomeComponent,
    SellerDashboardComponent,
    SellerOrdersComponent,
    SellerItemsComponent,
    SellerNewItemsComponent,
    SellerUpdateComponent
  ],
  entryComponents: [
    UpdateItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [AuthService, ItemsService, AuthGuard, CartItemsService,AdminAuthGuard,OrderService,SellerAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SellerTokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminTokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
