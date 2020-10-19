import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderPreviewContainerComponent } from './render-preview-container.component';

describe('RenderPreviewContainerComponent', () => {
  let component: RenderPreviewContainerComponent;
  let fixture: ComponentFixture<RenderPreviewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderPreviewContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderPreviewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
