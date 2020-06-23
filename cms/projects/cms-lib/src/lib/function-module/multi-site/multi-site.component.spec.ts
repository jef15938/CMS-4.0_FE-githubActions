import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSiteComponent } from './multi-site.component';

describe('MultiSiteComponent', () => {
  let component: MultiSiteComponent;
  let fixture: ComponentFixture<MultiSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
