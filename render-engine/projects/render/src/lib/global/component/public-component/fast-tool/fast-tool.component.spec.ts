import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastToolComponent } from './fast-tool.component';

describe('FastToolComponent', () => {
  let component: FastToolComponent;
  let fixture: ComponentFixture<FastToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FastToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
