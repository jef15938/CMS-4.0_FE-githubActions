import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsContentModalComponent } from './chips-content-modal.component';

describe('ChipsContentModalComponent', () => {
  let component: ChipsContentModalComponent;
  let fixture: ComponentFixture<ChipsContentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsContentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsContentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
