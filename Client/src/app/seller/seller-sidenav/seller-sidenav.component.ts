import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-seller-sidenav',
  templateUrl: './seller-sidenav.component.html',
  styleUrls: ['./seller-sidenav.component.css']
})
export class SellerSidenavComponent implements OnInit {

  constructor(public _authService:AuthService) { }
  
  ngOnInit(): void {
  }

}
