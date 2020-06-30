import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentViewRendererComponent } from './content-view-renderer.component';

describe('ContentViewRendererComponent', () => {
  let component: ContentViewRendererComponent;
  let fixture: ComponentFixture<ContentViewRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentViewRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentViewRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
