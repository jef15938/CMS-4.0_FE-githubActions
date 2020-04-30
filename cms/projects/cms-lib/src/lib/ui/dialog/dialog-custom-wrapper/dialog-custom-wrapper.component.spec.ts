import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCustomWrapperComponent } from './dialog-custom-wrapper.component';

describe('DialogCustomWrapperComponent', () => {
  let component: DialogCustomWrapperComponent;
  let fixture: ComponentFixture<DialogCustomWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCustomWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCustomWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
