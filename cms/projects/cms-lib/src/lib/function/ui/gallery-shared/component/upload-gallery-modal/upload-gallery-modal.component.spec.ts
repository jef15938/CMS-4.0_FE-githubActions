import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGalleryModalComponent } from './upload-gallery-modal.component';

describe('UploadGalleryModalComponent', () => {
  let component: UploadGalleryModalComponent;
  let fixture: ComponentFixture<UploadGalleryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadGalleryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGalleryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
