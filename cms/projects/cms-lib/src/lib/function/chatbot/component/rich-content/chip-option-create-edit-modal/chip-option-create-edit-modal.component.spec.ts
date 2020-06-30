import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipOptionCreateEditModalComponent } from './chip-option-create-edit-modal.component';

describe('ChipOptionCreateEditModalComponent', () => {
  let component: ChipOptionCreateEditModalComponent;
  let fixture: ComponentFixture<ChipOptionCreateEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipOptionCreateEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipOptionCreateEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
