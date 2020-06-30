import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryInfoCellComponent } from './gallery-info-cell.component';

describe('GalleryInfoCellComponent', () => {
  let component: GalleryInfoCellComponent;
  let fixture: ComponentFixture<GalleryInfoCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryInfoCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryInfoCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
