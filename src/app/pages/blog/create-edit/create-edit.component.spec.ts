import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditBlogComponent } from './create-edit.component';

describe('CreateEditBlogComponent', () => {
  let component: CreateEditBlogComponent;
  let fixture: ComponentFixture<CreateEditBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
