import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDownloadTypeComponent } from './form-download-type.component';

describe('FormDownloadTypeComponent', () => {
  let component: FormDownloadTypeComponent;
  let fixture: ComponentFixture<FormDownloadTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDownloadTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDownloadTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
