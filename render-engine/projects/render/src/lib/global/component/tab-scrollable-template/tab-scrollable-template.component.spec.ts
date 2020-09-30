import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabScrollableTemplateComponent } from './tab-scrollable-template.component';

describe('TabScrollableTemplateComponent', () => {
  let component: TabScrollableTemplateComponent;
  let fixture: ComponentFixture<TabScrollableTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabScrollableTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabScrollableTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
