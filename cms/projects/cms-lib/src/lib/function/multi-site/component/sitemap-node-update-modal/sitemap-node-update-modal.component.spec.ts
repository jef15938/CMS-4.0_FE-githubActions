import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapNodeUpdateModalComponent } from './sitemap-node-update-modal.component';

describe('SitemapNodeUpdateModalComponent', () => {
  let component: SitemapNodeUpdateModalComponent;
  let fixture: ComponentFixture<SitemapNodeUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemapNodeUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapNodeUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
