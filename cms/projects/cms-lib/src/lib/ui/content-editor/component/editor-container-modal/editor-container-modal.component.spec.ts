import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorContainerModalComponent } from './editor-container-modal.component';

describe('EditorContainerModalComponent', () => {
  let component: EditorContainerModalComponent;
  let fixture: ComponentFixture<EditorContainerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorContainerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorContainerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
