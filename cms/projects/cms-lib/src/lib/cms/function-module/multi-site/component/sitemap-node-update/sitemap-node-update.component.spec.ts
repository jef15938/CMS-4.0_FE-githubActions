import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapNodeUpdateComponent } from './sitemap-node-update.component';

describe('SitemapNodeUpdateComponent', () => {
  let component: SitemapNodeUpdateComponent;
  let fixture: ComponentFixture<SitemapNodeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemapNodeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapNodeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
