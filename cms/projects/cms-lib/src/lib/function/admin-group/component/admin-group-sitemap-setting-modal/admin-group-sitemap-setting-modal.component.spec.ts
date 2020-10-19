import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupSitemapSettingModalComponent } from './admin-group-sitemap-setting-modal.component';

describe('AdminGroupSitemapSettingModalComponent', () => {
  let component: AdminGroupSitemapSettingModalComponent;
  let fixture: ComponentFixture<AdminGroupSitemapSettingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGroupSitemapSettingModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupSitemapSettingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
