import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateControlGroupComponent } from './template-control-group.component';

describe('TemplateControlGroupComponent', () => {
  let component: TemplateControlGroupComponent;
  let fixture: ComponentFixture<TemplateControlGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateControlGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateControlGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
