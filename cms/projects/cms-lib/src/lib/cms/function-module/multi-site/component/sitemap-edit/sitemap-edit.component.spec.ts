import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitemapEditComponent } from './sitemap-edit.component';

describe('SitemapEditComponent', () => {
  let component: SitemapEditComponent;
  let fixture: ComponentFixture<SitemapEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitemapEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitemapEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
