import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCustomWrapperComponent } from './modal-custom-wrapper.component';

describe('ModalCustomWrapperComponent', () => {
  let component: ModalCustomWrapperComponent;
  let fixture: ComponentFixture<ModalCustomWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCustomWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCustomWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
