import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAuditingDialogComponent } from './approve-auditing-dialog.component';

describe('ApproveAuditingDialogComponent', () => {
  let component: ApproveAuditingDialogComponent;
  let fixture: ComponentFixture<ApproveAuditingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveAuditingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAuditingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
