import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupSitemapSettingNodeComponent } from './admin-group-sitemap-setting-node.component';

describe('AdminGroupSitemapSettingNodeComponent', () => {
  let component: AdminGroupSitemapSettingNodeComponent;
  let fixture: ComponentFixture<AdminGroupSitemapSettingNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGroupSitemapSettingNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupSitemapSettingNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
