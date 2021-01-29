import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { CartItemsService } from '../cart-items.service';
import { ItemsService } from '../items.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  search
  category='All'
  cartLength:Number
  selectedValue:string
  selectedCanteenValue:string
  canteens

  cartCount: number = 0;
  cartItem: Array<any> = [];
  

  constructor(public _authService:AuthService, private router:Router,private _cart:CartItemsService,private _item:ItemsService){}

  ngOnInit() {
    this._authService.citydetails().subscribe(res=>{
      this.selectedValue=res.city
      this.selectedCanteenValue=res.canteen
      this._authService.citySeller(this.selectedValue).subscribe(data=>{
        this.canteens=data
        var index=this.canteens.findIndex(x=>x.name==this.selectedCanteenValue)
        console.log(this.canteens)
        this._item.sendMessage(this.canteens[index]._id)
        this._cart.get(this.canteens[index]._id).subscribe(cart=>{
          console.log(cart)
          this.cartLength=cart.length
        })
      })
    })

    

  }



  onSearch(){
    // window.location.reload()
    localStorage.setItem('category',this.category)
    localStorage.setItem('search',this.search)
    this.router.navigate(['/search'])
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  items(){
    var subject = new Subject<Number>();
    // this._cart.get().subscribe(res=>{
    //   this.cartLength=res.length
    //   subject.next(this.cartLength);
    // })
    let obj={
      name:'Gaurav',
      length:8
    }
    let arr=[{name:'Gaurav',length:8},{name:'Gaurav',length:8},{name:'Gaurav',length:8},{name:'Gaurav',length:8}]
    // console.log(subject.asObservable)
    return arr.length
  }

  select(ref){
    this._authService.citySeller(this.selectedValue).subscribe(res=>{
      this.canteens=res
      console.log(`city cng to `,this.selectedValue,this.canteens[0].name)
      this.selectedCanteenValue=this.canteens[0].name;
      this._item.sendMessage(this.canteens[0]._id)
      this._authService.setCityDetails({city:this.selectedValue,canteen:this.selectedCanteenValue}).subscribe(data=>{
        console.log(data)
      })
    })
  }

  selectCanteen(ref){
    console.log(`canteen selected`,ref)
  }

}
