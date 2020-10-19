import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingBtnLineComponent } from './sharing-btn-line.component';

describe('SharingBtnLineComponent', () => {
  let component: SharingBtnLineComponent;
  let fixture: ComponentFixture<SharingBtnLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharingBtnLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingBtnLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
