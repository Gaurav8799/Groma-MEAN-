import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemsService } from '../cart-items.service';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchValue
  searchedArr
  msg:String
  category='1'

  productsList
  pagedList= [];
  breakpoint: number = 3;  //to adjust to screen
  // MatPaginator Inputs
  length: number = 0;
  pageSize: number = 3;  //displaying three cards each row
  pageSizeOptions: number[] = [3, 6, 9, 12];

  constructor(private _items:ItemsService,private _cart:CartItemsService,private _router:Router) { }

  ngOnInit(): void {
    this._items.teacherMesssage$.subscribe(message => {
      console.log(message)
      this.category = localStorage.getItem('category')
      this.searchValue = localStorage.getItem('search')
      this._items.onSearch(this.searchValue, this.category,message).subscribe(res => {
        this.searchedArr = res;
        this.breakpoint = (window.innerWidth <= 800) ? 1 : 3;
        this.pagedList = this.searchedArr.slice(0, 3);
        this.length = this.searchedArr.length;
        if (this.searchedArr.length == 0) {
          this.msg = "No Products Found";
        }
        else this.msg = `Result Found for search "${this.searchValue}"`
      })
    })
    
  }

  OnPageChange(event){
    console.log(event);
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.length){
      endIndex = this.length;
    }
    this.pagedList = this.searchedArr.slice(startIndex, endIndex);
  }

  onResize(event) { //to adjust to screen size
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 3;
  }

  addtocart(product){
    this._cart.addCart(product).subscribe(res=>{
      console.log(res)
      window.location.reload()
    })
  }

  openSingleProduct(product){
    this._router.navigate(['/product',product._id])
  }
}
