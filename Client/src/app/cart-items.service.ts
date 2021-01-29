import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  private _getCart="http://localhost:3000/cart";
  private _putCart="http://localhost:3000/cart/";
  private _postOrder="http://localhost:3000/order";
  private _cartSource=new Subject<string>();
  cartLength$=this._cartSource.asObservable();


  constructor(private _http:HttpClient) { }
  
  get(sellerId){
    return this._http.get<any>(this._getCart+'/'+sellerId) 
  }
  
  addCart(product){
    return this._http.post<any>(this._getCart,product)
  }
  
  delCart(id){
    return this._http.delete<any>(this._putCart+id)
  }
  
  putCart(item){
    return this._http.put<any>(this._putCart+item._id,item)
  }
  
  getCart(): Promise<any> {
    return this._http.get(
      this._getCart,
      { observe: 'response' }
    ).pipe(
      map((httpResponse: HttpResponse<any>) => {
        console.log('this is response',httpResponse.body,'Length',httpResponse.body.length)
        this.updateCount(httpResponse.body.length); // Don't know how your cardItem[] is formatted
        console.log('Body',[].concat(httpResponse.body))
        return [].concat(httpResponse.body);
      })
    ).toPromise();
  }

  private prodCount: number = 0;
  public prodCountCountChange: Subject<number> = new Subject();
  updateCount(count: number ): void {
    this.prodCount = count;
    this.prodCountCountChange.next(this.prodCount);
  }
  //this.serviceName.cartLength$.subscribe(length=>{ do what u want to do with length})

  newOrder(details){
    return this._http.post<any>(this._postOrder,details)
  }
}
