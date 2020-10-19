import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapNodeDetailComponent } from './sitemap-node-detail.component';

describe('SitemapNodeDetailComponent', () => {
  let component: SitemapNodeDetailComponent;
  let fixture: ComponentFixture<SitemapNodeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SitemapNodeDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapNodeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
