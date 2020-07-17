import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmFormInfoComponent } from './farm-form-info.component';

describe('FarmFormInfoComponent', () => {
  let component: FarmFormInfoComponent;
  let fixture: ComponentFixture<FarmFormInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmFormInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmFormInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
