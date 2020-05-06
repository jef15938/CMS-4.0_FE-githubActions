import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAuditingModalComponent } from './approve-auditing-modal.component';

describe('ApproveAuditingModalComponent', () => {
  let component: ApproveAuditingModalComponent;
  let fixture: ComponentFixture<ApproveAuditingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveAuditingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAuditingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
