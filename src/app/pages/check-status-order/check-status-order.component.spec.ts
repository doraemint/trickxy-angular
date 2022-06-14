import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckStatusOrderComponent } from './check-status-order.component';

describe('CheckStatusOrderComponent', () => {
  let component: CheckStatusOrderComponent;
  let fixture: ComponentFixture<CheckStatusOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckStatusOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckStatusOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
