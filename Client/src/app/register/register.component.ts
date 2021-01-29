import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,AfterViewInit {

  registerUserData = {
    name:'',
    email:'',
    password:''
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
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/home'])
        console.log(res , this.registerUserData)
      },
      err => console.log(err)
    )      
  }


}
