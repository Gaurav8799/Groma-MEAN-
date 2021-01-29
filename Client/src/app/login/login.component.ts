import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,AfterViewInit,OnChanges {

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
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/home'])
        console.log(res)  
      },
      err => console.log(err)
    ) 
  }

}
