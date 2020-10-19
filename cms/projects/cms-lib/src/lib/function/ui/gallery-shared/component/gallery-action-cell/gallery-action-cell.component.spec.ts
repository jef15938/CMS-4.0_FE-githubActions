import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryActionCellComponent } from './gallery-action-cell.component';

describe('GalleryActionCellComponent', () => {
  let component: GalleryActionCellComponent;
  let fixture: ComponentFixture<GalleryActionCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryActionCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryActionCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
