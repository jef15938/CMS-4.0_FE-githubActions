import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTemplateDemoComponent } from './group-template-demo.component';

describe('GroupTemplateDemoComponent', () => {
  let component: GroupTemplateDemoComponent;
  let fixture: ComponentFixture<GroupTemplateDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTemplateDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTemplateDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
