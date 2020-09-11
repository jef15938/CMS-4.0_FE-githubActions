import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGalleryProgressCellComponent } from './upload-gallery-progress-cell.component';

describe('UploadGalleryProgressCellComponent', () => {
  let component: UploadGalleryProgressCellComponent;
  let fixture: ComponentFixture<UploadGalleryProgressCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadGalleryProgressCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGalleryProgressCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
