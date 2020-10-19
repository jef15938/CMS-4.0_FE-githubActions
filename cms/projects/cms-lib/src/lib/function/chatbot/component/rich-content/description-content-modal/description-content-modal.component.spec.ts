import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionContentModalComponent } from './description-content-modal.component';

describe('DescriptionContentModalComponent', () => {
  let component: DescriptionContentModalComponent;
  let fixture: ComponentFixture<DescriptionContentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionContentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionContentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
