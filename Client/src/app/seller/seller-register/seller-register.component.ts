import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-seller-register',
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.css']
})
export class SellerRegisterComponent implements OnInit,AfterViewInit {

  registerUserData = {
    name:'',
    email:'',
    password:'',
    city:''
  }
  constructor(private _auth: AuthService,
              private _router: Router) { }

  @ViewChild('nameRef') nameElementRef:ElementRef            

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.nameElementRef.nativeElement.focus();
  }

  registerUser() {
    this._auth.registerSeller(this.registerUserData)
    .subscribe(
      res => {
        localStorage.setItem('Sellertoken', res.token)
        this._router.navigate(['/seller'])
        console.log(res , this.registerUserData)
      },
      err => console.log(err)
    )      
  }

}
