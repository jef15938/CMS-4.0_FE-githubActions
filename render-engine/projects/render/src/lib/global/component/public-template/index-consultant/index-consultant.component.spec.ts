import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexConsultantComponent } from './index-consultant.component';

describe('IndexConsultantComponent', () => {
  let component: IndexConsultantComponent;
  let fixture: ComponentFixture<IndexConsultantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexConsultantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
