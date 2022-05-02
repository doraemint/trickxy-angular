import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditShopComponent } from './create-edit-shop.component';

describe('CreateEditShopComponent', () => {
  let component: CreateEditShopComponent;
  let fixture: ComponentFixture<CreateEditShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
