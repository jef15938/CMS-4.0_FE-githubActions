import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryCategoryMaintainModalComponent } from './gallery-category-maintain-modal.component';

describe('GalleryCategoryMaintainModalComponent', () => {
  let component: GalleryCategoryMaintainModalComponent;
  let fixture: ComponentFixture<GalleryCategoryMaintainModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryCategoryMaintainModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryCategoryMaintainModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
