import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptNodeComponent } from './dept-node.component';

describe('DeptNodeComponent', () => {
  let component: DeptNodeComponent;
  let fixture: ComponentFixture<DeptNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
