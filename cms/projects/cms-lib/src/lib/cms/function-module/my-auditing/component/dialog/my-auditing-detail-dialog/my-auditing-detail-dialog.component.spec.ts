import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAuditingDetailDialogComponent } from './my-auditing-detail-dialog.component';

describe('MyAuditingDetailDialogComponent', () => {
  let component: MyAuditingDetailDialogComponent;
  let fixture: ComponentFixture<MyAuditingDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAuditingDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAuditingDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
