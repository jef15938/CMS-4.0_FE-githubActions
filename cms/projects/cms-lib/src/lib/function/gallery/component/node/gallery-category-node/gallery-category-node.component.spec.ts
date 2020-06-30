import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryCategoryNodeComponent } from './gallery-category-node.component';

describe('GalleryCategoryNodeComponent', () => {
  let component: GalleryCategoryNodeComponent;
  let fixture: ComponentFixture<GalleryCategoryNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryCategoryNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryCategoryNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
