import { Component, OnInit } from '@angular/core';
import { CartItemsService } from '../cart-items.service';
import { MatTableDataSource } from '@angular/material/table';  //new
import { SelectionModel } from '@angular/cdk/collections';//new
import { OrderService } from '../order.service';
import { ItemsService } from '../items.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart:boolean=true
  cartArr:any
  msg:String
  dataSource
  totalPrice:number=0
  orderArr:any=[]
  total

  constructor(private _cartService:CartItemsService,private _order:OrderService,private _item:ItemsService) { }

  ngOnInit(): void {
    this._item.teacherMesssage$.subscribe(sellerId=>{
      this._cartService.get(sellerId).subscribe(res=>{
        this.cartArr=res;
        if(this.cartArr.length==0){
          this.msg="Cart is Empty!! Nothing to show"
        }
        else this.msg="Your Cart is"
        this.dataSource=new MatTableDataSource<Element>(this.cartArr);
        this.orderArr=[]
      })
    })
  }

  displayedColumns = ['select', 'position', 'name', 'weight', 'symbol'];
  
  selection = new SelectionModel<Element>(true, []);
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  removeSelectedRows() {

    this.selection.selected.forEach(item => {
      let index: number = this.cartArr.findIndex(d => d === item);
      this._cartService.delCart(this.cartArr[index]._id).subscribe(res=>{
        console.log(res)
      })
      this.cartArr.splice(index,1)
      this.dataSource = new MatTableDataSource<Element>(this.cartArr);
    });
    this.selection = new SelectionModel<Element>(true, []);
  }

  cartTotal(){
    let total=0
    this.selection.selected.forEach(item=>{
      let index:number =this.cartArr.findIndex(d=> d===item)
      total+=this.cartArr[index].price*this.cartArr[index].quantity
    })
    this.totalPrice=total
    return total
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  inputChange(element,row,e){
    // functions reqd isSelected deselect
      if (element.quantity > 0) {
        this._cartService.putCart(element).subscribe((res) => {
          element = res;
          console.log(this.selection);
          // this.dataSource = new MatTableDataSource<Element>(this.cartArr);
        });
      } else {
        element.quantity = 1;
        alert('Quantity cannot be 0');
      }
  }

  order(){
    let total
    console.log(`You order is`)
    this.selection.selected.forEach(item => {
      let index: number = this.cartArr.findIndex(d => d === item);
      this.orderArr.push(item)
      console.log(item)
    });
    total=this.cartTotal()
    console.log(`Your cart total is ${total}`)
    this.cart=false
  }

  shippingDetails(details){
    let total=this.cartTotal()
    let orderDetail={
      UserId:this.orderArr[0].UserId,
      username:details.firstName + ' ' + details.lastName,
      sellerId:this.orderArr[0].sellerId,
      orderItems:this.orderArr,
      address:{
        address:details.address,
        city:details.city,
        state:details.state,
        pincode:details.pincode
      },
      total:total
    }
    console.log(orderDetail)
    this._order.newOrder(orderDetail).subscribe(res=>{
      console.log(res)
      this.removeSelectedRows()
      this.decQty()
    })
  }

  orderDone(){
    this.cart=true
  }

  decQty(){
    this.orderArr.forEach(item => {
      this._item.upItemQty(item).subscribe(res=>{
        console.log(res)
      })
    });
  }
  
}




