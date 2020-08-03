import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentVersionRecoverModalComponent } from './content-version-recover-modal.component';

describe('ContentVersionRecoverModalComponent', () => {
  let component: ContentVersionRecoverModalComponent;
  let fixture: ComponentFixture<ContentVersionRecoverModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentVersionRecoverModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentVersionRecoverModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
