import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAuditingComponent } from './my-auditing.component';

describe('MyAuditingComponent', () => {
  let component: MyAuditingComponent;
  let fixture: ComponentFixture<MyAuditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAuditingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAuditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
