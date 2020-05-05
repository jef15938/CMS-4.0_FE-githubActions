import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAuditingActionCellComponent } from './my-auditing-action-cell.component';

describe('MyAuditingActionCellComponent', () => {
  let component: MyAuditingActionCellComponent;
  let fixture: ComponentFixture<MyAuditingActionCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAuditingActionCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAuditingActionCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
