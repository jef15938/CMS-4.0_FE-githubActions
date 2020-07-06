import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDownloadTempComponent } from './form-download-temp.component';

describe('FormDownloadTempComponent', () => {
  let component: FormDownloadTempComponent;
  let fixture: ComponentFixture<FormDownloadTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDownloadTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDownloadTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
