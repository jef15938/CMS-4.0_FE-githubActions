import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmSharedContainerModalComponent } from './farm-shared-container-modal.component';

describe('FarmSharedContainerModalComponent', () => {
  let component: FarmSharedContainerModalComponent;
  let fixture: ComponentFixture<FarmSharedContainerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FarmSharedContainerModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmSharedContainerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
