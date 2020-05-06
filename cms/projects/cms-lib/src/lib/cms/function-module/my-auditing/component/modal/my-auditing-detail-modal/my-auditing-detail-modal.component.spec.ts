import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAuditingDetailModalComponent } from './my-auditing-detail-modal.component';

describe('MyAuditingDetailModalComponent', () => {
  let component: MyAuditingDetailModalComponent;
  let fixture: ComponentFixture<MyAuditingDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAuditingDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAuditingDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
