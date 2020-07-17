import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmTableInfoComponent } from './farm-table-info.component';

describe('FarmTableInfoComponent', () => {
  let component: FarmTableInfoComponent;
  let fixture: ComponentFixture<FarmTableInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmTableInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmTableInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
