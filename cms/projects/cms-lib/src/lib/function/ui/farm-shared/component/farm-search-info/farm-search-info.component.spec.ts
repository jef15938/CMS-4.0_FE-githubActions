import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmSearchInfoComponent } from './farm-search-info.component';

describe('FarmSearchInfoComponent', () => {
  let component: FarmSearchInfoComponent;
  let fixture: ComponentFixture<FarmSearchInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmSearchInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmSearchInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
