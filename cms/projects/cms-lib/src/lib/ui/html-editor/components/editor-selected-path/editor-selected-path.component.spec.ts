import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorSelectedPathComponent } from './editor-selected-path.component';

describe('EditorSelectedPathComponent', () => {
  let component: EditorSelectedPathComponent;
  let fixture: ComponentFixture<EditorSelectedPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorSelectedPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorSelectedPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
