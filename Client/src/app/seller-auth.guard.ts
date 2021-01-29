import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class SellerAuthGuard implements CanActivate {
  constructor(private _authService: AuthService,
    private _router: Router) { }

  canActivate(): boolean {
    if (this._authService.sellerLoggedIn()) {
      return true
    } else {        
      this._router.navigate(['/seller/login'])
      return false
    }
  }
}
