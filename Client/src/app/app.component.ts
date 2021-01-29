import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CartItemsService } from './cart-items.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  sideBarOpen = false;
  search
  category='All'
  cartLength:Number

  constructor(public _authService:AuthService, private router:Router,private _cart:CartItemsService){}

  ngOnInit(){
  }

  
}
