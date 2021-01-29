import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _getUrl="http://localhost:3000/order";
  private _getOrder="http://localhost:3000/order/user";
  private _postOrder="http://localhost:3000/order";
  private _putOrder="http://localhost:3000/order/";

  constructor(private _http:HttpClient,private _router:Router) { }

  getOrder(){
    return this._http.get<any>(this._getUrl)
  }

  newOrder(details){
    return this._http.post<any>(this._postOrder,details)
  }

  userOrder(){
    return this._http.get<any>(this._getOrder)
  }

  putOrder(row){
    console.log(row)
    return this._http.put<any>(this._putOrder+row._id,row)
  }
}
