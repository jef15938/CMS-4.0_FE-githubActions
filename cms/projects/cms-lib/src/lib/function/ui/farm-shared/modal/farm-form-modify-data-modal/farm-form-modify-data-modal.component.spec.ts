import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmFormModifyDataModalComponent } from './farm-form-modify-data-modal.component';

describe('FarmFormModifyDataModalComponent', () => {
  let component: FarmFormModifyDataModalComponent;
  let fixture: ComponentFixture<FarmFormModifyDataModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmFormModifyDataModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmFormModifyDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
