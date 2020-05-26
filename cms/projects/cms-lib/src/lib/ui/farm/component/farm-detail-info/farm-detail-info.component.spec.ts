import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmDetailInfoComponent } from './farm-detail-info.component';

describe('FarmDetailInfoComponent', () => {
  let component: FarmDetailInfoComponent;
  let fixture: ComponentFixture<FarmDetailInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmDetailInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmDetailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
