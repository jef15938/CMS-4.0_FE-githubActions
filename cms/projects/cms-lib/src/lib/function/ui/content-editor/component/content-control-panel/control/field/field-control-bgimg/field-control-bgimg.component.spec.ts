import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldControlBgimgComponent } from './field-control-bgimg.component';

describe('FieldControlBgimgComponent', () => {
  let component: FieldControlBgimgComponent;
  let fixture: ComponentFixture<FieldControlBgimgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldControlBgimgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldControlBgimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
