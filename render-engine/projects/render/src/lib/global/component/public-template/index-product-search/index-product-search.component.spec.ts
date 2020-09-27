import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexProductSearchComponent } from './index-product-search.component';

describe('IndexProductSearchComponent', () => {
  let component: IndexProductSearchComponent;
  let fixture: ComponentFixture<IndexProductSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexProductSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
