import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmFormViewDataModalComponent } from './farm-form-view-data-modal.component';

describe('FarmFormViewDataModalComponent', () => {
  let component: FarmFormViewDataModalComponent;
  let fixture: ComponentFixture<FarmFormViewDataModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmFormViewDataModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmFormViewDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
