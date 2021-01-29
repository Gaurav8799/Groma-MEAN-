import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable()
export class AuthService {

  private _registerUrl = "http://localhost:3000/user/register";
  private _cityDetailUrl = "http://localhost:3000/user/citydetails";
  private _loginUrl = "http://localhost:3000/user/login";
  private _adminLoginUrl = "http://localhost:3000/admin/login";
  private _sellerListUrl = "http://localhost:3000/seller/";
  private _sellerLoginUrl = "http://localhost:3000/seller/login";
  private _sellerRegisterUrl = "http://localhost:3000/seller/register";
  private _userInfo = "http://localhost:3000/user/detail";

  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }

  userInfo(){
    const token=this.getToken();
      let payload;
      if(token){
        payload=token.split('.')[1]
        payload=window.atob(payload)
        return JSON.parse(payload);
      }
  }

  citydetails(){
    return this.http.get<any>(this._cityDetailUrl)
  }

  setCityDetails(cityDetails){
    return this.http.put<any>(this._cityDetailUrl,cityDetails)
  }

  //-----------------------------------------
  // Admin log functions
  //----------------------------------------

  loggedInAdmin(user){
    return this.http.post<any>(this._adminLoginUrl, user) 
  }

  logOutAdmin(){
    localStorage.removeItem('Admintoken')
    this._router.navigate(['/admin/login'])
  }

  getTokenAdmin() {
    return localStorage.getItem('Admintoken')
  }
  
  adminLoggedIn() {
    return !!localStorage.getItem('Admintoken')    
  }

  AdminInfo(){
    const token=this.getTokenAdmin();
      let payload;
      if(token){
        payload=token.split('.')[1]
        payload=window.atob(payload)
        return JSON.parse(payload);
      }
  }

  // -----------------------------------------
  // Seller functions
  //------------------------------------------

  citySeller(city){
    return this.http.get<any>(this._sellerListUrl+city)
  }

  registerSeller(user) {
    return this.http.post<any>(this._sellerRegisterUrl, user)
  }

  loggedInSeller(user){
    return this.http.post<any>(this._sellerLoginUrl, user) 
  }

  logOutSeller(){
    localStorage.removeItem('Sellertoken')
    this._router.navigate(['/seller/login'])
  }

  getTokenSeller() {
    return localStorage.getItem('Sellertoken')
  }
  
  sellerLoggedIn() {
    return !!localStorage.getItem('Sellertoken')    
  }

  SellerInfo(){
    const token=this.getTokenSeller();
      let payload;
      if(token){
        payload=token.split('.')[1]
        payload=window.atob(payload)
        return JSON.parse(payload);
      }
  }

}
