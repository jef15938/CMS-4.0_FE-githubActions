import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicRoutingComponent } from './dynamic-routing.component';

describe('DynamicRoutingComponent', () => {
  let component: DynamicRoutingComponent;
  let fixture: ComponentFixture<DynamicRoutingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicRoutingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
