import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGalleryActionCellComponent } from './upload-gallery-action-cell.component';

describe('GalleryActionCellComponent', () => {
  let component: UploadGalleryActionCellComponent;
  let fixture: ComponentFixture<UploadGalleryActionCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadGalleryActionCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGalleryActionCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
