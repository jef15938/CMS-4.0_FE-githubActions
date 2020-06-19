import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonContentModalComponent } from './button-content-modal.component';

describe('ButtonContentModalComponent', () => {
  let component: ButtonContentModalComponent;
  let fixture: ComponentFixture<ButtonContentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonContentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonContentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
