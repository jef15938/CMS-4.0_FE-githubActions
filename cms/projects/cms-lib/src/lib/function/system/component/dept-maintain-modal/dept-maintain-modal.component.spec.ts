import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptMaintainModalComponent } from './dept-maintain-modal.component';

describe('DeptMaintainModalComponent', () => {
  let component: DeptMaintainModalComponent;
  let fixture: ComponentFixture<DeptMaintainModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptMaintainModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptMaintainModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
