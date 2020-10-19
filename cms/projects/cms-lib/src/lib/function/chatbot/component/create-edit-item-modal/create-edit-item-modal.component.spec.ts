import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditItemModalComponent } from './create-edit-item-modal.component';

describe('CreateEditItemModalComponent', () => {
  let component: CreateEditItemModalComponent;
  let fixture: ComponentFixture<CreateEditItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditItemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
