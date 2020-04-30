import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptMaintainDialogComponent } from './dept-maintain-dialog.component';

describe('DeptMaintainDialogComponent', () => {
  let component: DeptMaintainDialogComponent;
  let fixture: ComponentFixture<DeptMaintainDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptMaintainDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptMaintainDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
