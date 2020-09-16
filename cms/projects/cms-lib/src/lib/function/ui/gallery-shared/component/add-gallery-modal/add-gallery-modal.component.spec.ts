import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGalleryModalComponent } from './add-gallery-modal.component';

describe('AddGalleryModalComponent', () => {
  let component: AddGalleryModalComponent;
  let fixture: ComponentFixture<AddGalleryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGalleryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGalleryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
