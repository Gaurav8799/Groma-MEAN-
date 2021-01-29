import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private _getUrl="http://localhost:3000/items";
  private _searchUrl="http://localhost:3000/items/search";
  private _teacherMessageSource=new Subject<string>();
  teacherMesssage$=this._teacherMessageSource.asObservable()

  constructor(private http:HttpClient,private _router:Router) { }

  sendMessage(message:string){
    this._teacherMessageSource.next(message);
  }
 
  getSellerItems(seller){
    return this.http.get<any>(this._getUrl+'/seller/'+seller)
  }
  
  get(){
    return this.http.get<any>(this._getUrl)
  }

  getItem(id){
    return this.http.get<any>(this._getUrl+'/'+id)
  }

  onSearch(searchValue,category,sellerId){
    //:Observable<HttpResponse<any>>{
    let body={
      searchValue,
      category,
      sellerId
    }
    return this.http.post<any>(this._searchUrl,body)
  }

  addItem(item){
    return this.http.post<any>(this._getUrl,item)
  }

  delItem(id){
    return this.http.delete<any>(this._getUrl+'/'+id)
  }

  upItem(item,row){
    console.log(row)
    return this.http.put<any>(this._getUrl+'/'+row._id,item)
  }

  upItemQty(item){
    return this.http.put<any>(this._getUrl+'/qty/'+item.productId,item)
  }

}
