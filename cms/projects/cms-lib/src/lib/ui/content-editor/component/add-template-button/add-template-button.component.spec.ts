import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTemplateButtonComponent } from './add-template-button.component';

describe('AddTemplateButtonComponent', () => {
  let component: AddTemplateButtonComponent;
  let fixture: ComponentFixture<AddTemplateButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTemplateButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTemplateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
