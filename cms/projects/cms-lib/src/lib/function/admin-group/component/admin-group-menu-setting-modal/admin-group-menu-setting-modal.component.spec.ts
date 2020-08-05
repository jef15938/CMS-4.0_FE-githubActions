import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupMenuSettingModalComponent } from './admin-group-menu-setting-modal.component';

describe('AdminGroupMenuSettingModalComponent', () => {
  let component: AdminGroupMenuSettingModalComponent;
  let fixture: ComponentFixture<AdminGroupMenuSettingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGroupMenuSettingModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupMenuSettingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
