import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPathComponent } from './editor-path.component';

describe('EditorPathComponent', () => {
  let component: EditorPathComponent;
  let fixture: ComponentFixture<EditorPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
