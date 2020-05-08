import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapEditContentModalComponent } from './sitemap-edit-content-modal.component';

describe('SitemapEditContentModalComponent', () => {
  let component: SitemapEditContentModalComponent;
  let fixture: ComponentFixture<SitemapEditContentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemapEditContentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapEditContentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
