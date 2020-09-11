import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGalleryInfoCellComponent } from './upload-gallery-info-cell.component';

describe('UploadGalleryInfoCellComponent', () => {
  let component: UploadGalleryInfoCellComponent;
  let fixture: ComponentFixture<UploadGalleryInfoCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadGalleryInfoCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGalleryInfoCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
