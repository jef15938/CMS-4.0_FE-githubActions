import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingBtnFbComponent } from './sharing-btn-fb.component';

describe('SharingBtnFbComponent', () => {
  let component: SharingBtnFbComponent;
  let fixture: ComponentFixture<SharingBtnFbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharingBtnFbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingBtnFbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
