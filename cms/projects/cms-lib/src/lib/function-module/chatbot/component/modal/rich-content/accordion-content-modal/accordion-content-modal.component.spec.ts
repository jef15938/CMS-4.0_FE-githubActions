import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionContentModalComponent } from './accordion-content-modal.component';

describe('AccordionContentModalComponent', () => {
  let component: AccordionContentModalComponent;
  let fixture: ComponentFixture<AccordionContentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionContentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionContentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
