import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditingActionCellComponent } from './auditing-action-cell.component';

describe('AuditingActionCellComponent', () => {
  let component: AuditingActionCellComponent;
  let fixture: ComponentFixture<AuditingActionCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditingActionCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditingActionCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
