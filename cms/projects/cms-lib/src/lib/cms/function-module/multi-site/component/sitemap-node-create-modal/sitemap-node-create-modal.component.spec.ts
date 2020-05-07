import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapNodeCreateModalComponent } from './sitemap-node-create-modal.component';

describe('SitemapNodeCreateModalComponent', () => {
  let component: SitemapNodeCreateModalComponent;
  let fixture: ComponentFixture<SitemapNodeCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemapNodeCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapNodeCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
