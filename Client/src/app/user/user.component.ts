import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartItemsService } from '../cart-items.service';
import { ItemsService } from '../items.service';
import { ItemsComponent } from '../items/items.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  sideBarOpen = false;
  search
  category='All'
  cartLength:Number

  constructor(public _authService:AuthService, private router:Router,private _cart:CartItemsService,private _items:ItemsService){}

  ngOnInit(){
    this._items.teacherMesssage$.subscribe(sellerId=>{
      this._cart.get(sellerId).subscribe(res=>{
        this.cartLength=res.length
      })
    })
  }
  onSearch(){
    // window.location.reload()
    localStorage.setItem('category',this.category)
    localStorage.setItem('search',this.search)
    this.router.navigate(['/search'])
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
