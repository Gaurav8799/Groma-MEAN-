import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerNewItemsComponent } from './seller-new-items.component';

describe('SellerNewItemsComponent', () => {
  let component: SellerNewItemsComponent;
  let fixture: ComponentFixture<SellerNewItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerNewItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerNewItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
