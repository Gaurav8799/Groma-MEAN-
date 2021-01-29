import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from './admin-auth.guard';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { CategoryListComponent } from './admin/category-list/category-list.component';
import { ItemsListComponent } from './admin/items-list/items-list.component';
import { NewItemComponent } from './admin/new-item/new-item.component';
import { SellerlistComponent } from './admin/sellerlist/sellerlist.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { SellerAuthGuard } from './seller-auth.guard';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { SellerHomeComponent } from './seller/seller-home/seller-home.component';
import { SellerItemsComponent } from './seller/seller-items/seller-items.component';
import { SellerLoginComponent } from './seller/seller-login/seller-login.component';
import { SellerNewItemsComponent } from './seller/seller-new-items/seller-new-items.component';
import { SellerOrdersComponent } from './seller/seller-orders/seller-orders.component';
import { SellerRegisterComponent } from './seller/seller-register/seller-register.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'seller', component: SellerHomeComponent, children: [
    {
      path: '',
      component: SellerDashboardComponent
    },
    {
      path: 'category',
      component: CategoryListComponent
    },
    {
      path: 'login',
      component: SellerLoginComponent
    },
    {
      path: 'register',
      component: SellerRegisterComponent
    },
    {
      path: 'seller',
      component: SellerlistComponent, canActivate: [SellerAuthGuard]
    },
    {
      path: 'items',
      component: SellerItemsComponent, canActivate: [SellerAuthGuard]
    },
    {
      path: 'new',
      component: SellerNewItemsComponent, canActivate: [SellerAuthGuard]
    },
    {
      path: 'orders',
      component: SellerOrdersComponent, canActivate: [SellerAuthGuard]
    }
    ]
  },
  {
    path: 'admin', component: AdminHomeComponent, children: [
    {
      path: '',
      component: AdminDashboardComponent
    },
    {
      path: 'category',
      component: CategoryListComponent
    },
    {
      path: 'login',
      component: AdminLoginComponent
    },
    {
      path: 'seller',
      component: SellerlistComponent, canActivate: [AdminAuthGuard]
    },
    {
      path: 'items',
      component: ItemsListComponent, canActivate: [AdminAuthGuard]
    },
    {
      path: 'new',
      component: NewItemComponent, canActivate: [AdminAuthGuard]
    },
    {
      path: 'orders',
      component: AdminOrdersComponent, canActivate: [AdminAuthGuard]
    }
    ]
  },
  {
    path: '', component: UserComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'search', component: SearchComponent },
      { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
      { path: 'product/:id', component: SingleProductComponent },
      { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
      { path: '**', component: HomeComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
