import { TestBed } from '@angular/core/testing';

import { SellerTokenInterceptorService } from './seller-token-interceptor.service';

describe('SellerTokenInterceptorService', () => {
  let service: SellerTokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerTokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
