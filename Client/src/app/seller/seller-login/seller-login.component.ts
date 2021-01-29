import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css']
})
export class SellerLoginComponent implements OnInit {

  loginUserData = {
    email:'',
    password:''
  }


  @ViewChild('nameRef') nameElementRef:ElementRef;

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.nameElementRef.nativeElement.focus();
  }

  ngOnChanges(changes:SimpleChanges){
    console.log(changes);
    const loggedInValue=changes['loginUserData.email'];
    console.log(loggedInValue);
  }

  loginUser () {
    this._auth.loggedInSeller(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('Sellertoken', res.token)
        this._router.navigate(['/seller'])
        console.log(res)  
      },
      err => console.log(err)
    ) 
  }

}
