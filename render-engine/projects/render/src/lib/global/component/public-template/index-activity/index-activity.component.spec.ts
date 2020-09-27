import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexActivityComponent } from './index-activity.component';

describe('IndexActivityComponent', () => {
  let component: IndexActivityComponent;
  let fixture: ComponentFixture<IndexActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
