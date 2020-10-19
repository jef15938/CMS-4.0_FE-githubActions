import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropperMenuEditComponent } from './cropper-menu-edit.component';

describe('CropperMenuEditComponent', () => {
  let component: CropperMenuEditComponent;
  let fixture: ComponentFixture<CropperMenuEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropperMenuEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropperMenuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
