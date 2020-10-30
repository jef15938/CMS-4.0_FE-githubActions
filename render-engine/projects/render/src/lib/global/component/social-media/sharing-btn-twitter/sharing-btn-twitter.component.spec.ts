import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingBtnTwitterComponent } from './sharing-btn-twitter.component';

describe('SharingBtnTwitterComponent', () => {
  let component: SharingBtnTwitterComponent;
  let fixture: ComponentFixture<SharingBtnTwitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharingBtnTwitterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingBtnTwitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
