import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateControlDataSourceComponent } from './template-control-data-source.component';

describe('TemplateControlDataSourceComponent', () => {
  let component: TemplateControlDataSourceComponent;
  let fixture: ComponentFixture<TemplateControlDataSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateControlDataSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateControlDataSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
