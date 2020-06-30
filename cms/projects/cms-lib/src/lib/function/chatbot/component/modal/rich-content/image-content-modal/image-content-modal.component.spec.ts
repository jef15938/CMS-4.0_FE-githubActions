import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageContentModalComponent } from './image-content-modal.component';

describe('ImageContentModalComponent', () => {
  let component: ImageContentModalComponent;
  let fixture: ComponentFixture<ImageContentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageContentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageContentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
