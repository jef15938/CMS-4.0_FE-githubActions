import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabDemoComponent } from './tab-demo.component';

describe('TabDemoComponent', () => {
  let component: TabDemoComponent;
  let fixture: ComponentFixture<TabDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
