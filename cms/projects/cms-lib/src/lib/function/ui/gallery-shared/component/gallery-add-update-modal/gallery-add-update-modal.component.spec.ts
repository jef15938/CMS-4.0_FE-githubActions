import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryAddUpdateModalComponent } from './gallery-add-update-modal.component';

describe('GalleryAddUpdateModalComponent', () => {
  let component: GalleryAddUpdateModalComponent;
  let fixture: ComponentFixture<GalleryAddUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryAddUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryAddUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
