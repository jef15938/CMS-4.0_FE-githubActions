import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryCategoryMaintainDialogComponent } from './gallery-category-maintain-dialog.component';

describe('GalleryCategoryMaintainDialogComponent', () => {
  let component: GalleryCategoryMaintainDialogComponent;
  let fixture: ComponentFixture<GalleryCategoryMaintainDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryCategoryMaintainDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryCategoryMaintainDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
