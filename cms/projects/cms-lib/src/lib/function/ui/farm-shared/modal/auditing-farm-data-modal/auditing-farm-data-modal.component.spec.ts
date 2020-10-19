import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditingFarmDataModalComponent } from './auditing-farm-data-modal.component';

describe('AuditingFarmDataModalComponent', () => {
  let component: AuditingFarmDataModalComponent;
  let fixture: ComponentFixture<AuditingFarmDataModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuditingFarmDataModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditingFarmDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
