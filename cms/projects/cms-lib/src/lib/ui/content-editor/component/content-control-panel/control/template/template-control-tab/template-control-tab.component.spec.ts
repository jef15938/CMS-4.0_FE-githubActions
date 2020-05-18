import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateControlTabComponent } from './template-control-tab.component';

describe('TemplateControlTabComponent', () => {
  let component: TemplateControlTabComponent;
  let fixture: ComponentFixture<TemplateControlTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateControlTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateControlTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
