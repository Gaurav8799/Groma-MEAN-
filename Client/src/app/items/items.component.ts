import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {

  productsList
  pagedList= [];
  breakpoint: number = 3;  //to adjust to screen
  // MatPaginator Inputs
  length: number = 0;
  pageSize: number = 3;  //displaying three cards each row
  pageSizeOptions: number[] = [3, 6, 9, 12];

  constructor(private _item:ItemsService){}

  ngOnInit() {
    this._item.teacherMesssage$.subscribe(message=>{
      alert(message)
      this._item.getSellerItems(message).subscribe(data=>{
        this.breakpoint = (window.innerWidth <= 800) ? 1 : 3;
        this.productsList = data;
        this.pagedList = this.productsList.slice(0, 3);
        this.length = this.productsList.length;
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
    this.pagedList = this.productsList.slice(startIndex, endIndex);
  }

  onResize(event) { //to adjust to screen size
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 3;
  }

  
}
