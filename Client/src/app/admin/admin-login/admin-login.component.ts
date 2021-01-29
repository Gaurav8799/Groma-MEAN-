import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

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
    this._auth.loggedInAdmin(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('Admintoken', res.token)
        this._router.navigate(['/admin'])
        console.log(res)  
      },
      err => console.log(err)
    ) 
  }


}
