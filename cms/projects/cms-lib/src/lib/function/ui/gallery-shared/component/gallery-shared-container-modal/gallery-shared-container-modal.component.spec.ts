import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerySharedContainerModalComponent } from './gallery-shared-container-modal.component';

describe('GallerySharedContainerModalComponent', () => {
  let component: GallerySharedContainerModalComponent;
  let fixture: ComponentFixture<GallerySharedContainerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GallerySharedContainerModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GallerySharedContainerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
