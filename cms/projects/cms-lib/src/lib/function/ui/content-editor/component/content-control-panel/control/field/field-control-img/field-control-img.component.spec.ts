import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldControlImgComponent } from './field-control-img.component';

describe('FieldControlImgComponent', () => {
  let component: FieldControlImgComponent;
  let fixture: ComponentFixture<FieldControlImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldControlImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldControlImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
