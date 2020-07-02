import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceDemoComponent } from './data-source-demo.component';

describe('DataSourceDemoComponent', () => {
  let component: DataSourceDemoComponent;
  let fixture: ComponentFixture<DataSourceDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSourceDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
