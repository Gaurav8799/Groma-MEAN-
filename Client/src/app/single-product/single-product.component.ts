import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItemsService } from '../cart-items.service';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  product={
    name,
    price:0,
    _id:0,
    category:"None",
    description:'',
    productImage:''
  }

  image=["https://material.angular.io/assets/img/examples/shiba2.jpg","https://material.angular.io/assets/img/examples/shiba2.jpg","https://material.angular.io/assets/img/examples/shiba2.jpg","https://material.angular.io/assets/img/examples/shiba2.jpg","https://material.angular.io/assets/img/examples/shiba2.jpg","https://material.angular.io/assets/img/examples/shiba2.jpg"]

  constructor(private _activatedRoute:ActivatedRoute,private _item:ItemsService,private _cart:CartItemsService) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(param=>{
      this._item.getItem(param.id).subscribe(item=>{
        if(item) this.product=item
        console.log(this.product,item)
      })
    })
  }

  addToCart(){
    this._cart.addCart(this.product).subscribe(res=>{
      console.log(res)
      window.location.reload()
    })
  }

}
