import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditingSitemapModalComponent } from './auditing-sitemap-modal.component';

describe('AuditingSitemapModalComponent', () => {
  let component: AuditingSitemapModalComponent;
  let fixture: ComponentFixture<AuditingSitemapModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditingSitemapModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditingSitemapModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
